"use client";

import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function GoogleSignInButton() {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-headline mb-6 text-center">Welcome to TaskTango</h2>
      <p className="mb-8 text-center text-muted-foreground">Sign in to manage your tasks.</p>
      <Button onClick={signInWithGoogle} disabled={loading} size="lg">
        <LogIn className="mr-2 h-5 w-5" />
        Sign in with Google
      </Button>
    </div>
  );
}
