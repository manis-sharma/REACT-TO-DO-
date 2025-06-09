"use client";

import type { Task } from "@/hooks/use-tasks";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string, completed: boolean) => void;
  onDelete: (taskId: string) => void;
}

export function TaskItem({ task, onToggleComplete, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 border-b bg-card rounded-lg shadow-sm animate-in fade-in duration-300 mb-2">
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={(checked) => onToggleComplete(task.id, !!checked)}
        aria-labelledby={`task-label-${task.id}`}
      />
      <label
        id={`task-label-${task.id}`}
        htmlFor={`task-${task.id}`}
        className={cn(
          "flex-grow cursor-pointer text-sm",
          task.completed && "line-through text-muted-foreground"
        )}
      >
        {task.text}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task: ${task.text}`}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
