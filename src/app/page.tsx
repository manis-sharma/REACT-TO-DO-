"use client";

import { useAuth } from "@/hooks/use-auth";
import { useTasks } from "@/hooks/use-tasks";
import { GoogleSignInButton } from "@/components/auth/google-signin-button";
import { AddTaskForm } from "@/components/tasks/add-task-form";
import { TaskList } from "@/components/tasks/task-list";
import { LoadingSpinner } from "@/components/ui-elements/loading-spinner";
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const { user, loading: authLoading, error: authError } = useAuth();
  const { 
    tasks, 
    loading: tasksLoading, 
    addTask, 
    toggleTaskComplete, 
    deleteTask 
  } = useTasks(user);

  if (authLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-grow flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </main>
      </div>
    );
  }

  if (authError) {
    return (
       <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-destructive text-center font-headline">Authentication Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-destructive-foreground bg-destructive p-3 rounded-md">
                Could not authenticate. Please try again later.
              </p>
              <p className="text-xs text-muted-foreground mt-2 text-center">{authError.message}</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {!user ? (
            <Card className="shadow-xl">
              <CardContent className="p-0">
                <GoogleSignInButton />
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-center text-primary">
                  Welcome, {user.displayName || "User"}!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AddTaskForm onAddTask={addTask} />
                {tasksLoading ? <LoadingSpinner /> : (
                  <TaskList 
                    tasks={tasks} 
                    onToggleComplete={toggleTaskComplete} 
                    onDeleteTask={deleteTask} 
                  />
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} TaskTango. All rights reserved.</p>
      </footer>
    </div>
  );
}
