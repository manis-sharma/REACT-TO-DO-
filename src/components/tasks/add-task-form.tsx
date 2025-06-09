"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { useTasks } from "@/hooks/use-tasks";

interface AddTaskFormProps {
  onAddTask: ReturnType<typeof useTasks>["addTask"];
}

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    await onAddTask(taskText);
    setTaskText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-grow"
        aria-label="New task"
      />
      <Button type="submit" aria-label="Add task">
        <PlusCircle className="h-5 w-5 mr-2" />
        Add Task
      </Button>
    </form>
  );
}
