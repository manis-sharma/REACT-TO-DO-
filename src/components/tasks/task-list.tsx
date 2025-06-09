"use client";

import type { Task } from "@/hooks/use-tasks";
import { TaskItem } from "./task-item";
import type { useTasks } from "@/hooks/use-tasks";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: ReturnType<typeof useTasks>["toggleTaskComplete"];
  onDeleteTask: ReturnType<typeof useTasks>["deleteTask"];
}

export function TaskList({ tasks, onToggleComplete, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <p className="text-lg">No tasks yet!</p>
        <p>Add a task to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}
