"use client";

import { useState, useEffect, useCallback } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Timestamp;
  userId: string;
}

export function useTasks(user: User | null) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const tasksCollectionRef = collection(db, "users", user.uid, "tasks");
    const q = query(tasksCollectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Task));
        setTasks(fetchedTasks);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching tasks:", error);
        toast({ title: "Error", description: "Failed to fetch tasks.", variant: "destructive" });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, toast]);

  const addTask = useCallback(async (text: string) => {
    if (!user) return;
    if (!text.trim()) {
      toast({ title: "Error", description: "Task cannot be empty.", variant: "destructive" });
      return;
    }
    try {
      const tasksCollectionRef = collection(db, "users", user.uid, "tasks");
      await addDoc(tasksCollectionRef, {
        text,
        completed: false,
        createdAt: Timestamp.now(),
        userId: user.uid,
      });
      toast({ title: "Success", description: "Task added." });
    } catch (error) {
      console.error("Error adding task:", error);
      toast({ title: "Error", description: "Failed to add task.", variant: "destructive" });
    }
  }, [user, toast]);

  const toggleTaskComplete = useCallback(async (taskId: string, completed: boolean) => {
    if (!user) return;
    try {
      const taskDocRef = doc(db, "users", user.uid, "tasks", taskId);
      await updateDoc(taskDocRef, { completed });
      toast({ title: "Success", description: "Task updated." });
    } catch (error) {
      console.error("Error updating task:", error);
      toast({ title: "Error", description: "Failed to update task.", variant: "destructive" });
    }
  }, [user, toast]);

  const deleteTask = useCallback(async (taskId: string) => {
    if (!user) return;
    try {
      const taskDocRef = doc(db, "users", user.uid, "tasks", taskId);
      await deleteDoc(taskDocRef);
      toast({ title: "Success", description: "Task deleted." });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({ title: "Error", description: "Failed to delete task.", variant: "destructive" });
    }
  }, [user, toast]);

  return { tasks, loading, addTask, toggleTaskComplete, deleteTask };
}
