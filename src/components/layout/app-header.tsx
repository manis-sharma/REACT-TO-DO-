"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui-elements/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, Tangotube } from "lucide-react"; // Using a placeholder icon for Tango
import Link from 'next/link';

export function AppHeader() {
  const { user, signOut, loading } = useAuth();

  return (
    <header className="py-4 px-4 sm:px-6 border-b mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          {/* Using a generic icon as Tangotube is not standard */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M15.5 8.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5c.829 0 1.5-.672 1.5-1.5s-.671-1.5-1.5-1.5z"/><path d="M8.5 13.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5c.829 0 1.5-.672 1.5-1.5s-.671-1.5-1.5-1.5z"/><path d="M12 12l3.5-3.5"/><path d="M12 12l-3.5 3.5"/></svg>
          <h1 className="text-2xl font-headline font-semibold text-primary">TaskTango</h1>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user && (
            <Button variant="outline" size="sm" onClick={signOut} disabled={loading}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
