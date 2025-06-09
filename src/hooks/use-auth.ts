"use client";

import type { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState({ user, loading: false, error: null });
    }, (error) => {
      setAuthState({ user: null, loading: false, error });
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await signInWithPopup(auth, googleProvider);
      // onAuthStateChanged will handle setting the user
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setAuthState(prev => ({ ...prev, loading: false, error: error as Error }));
    }
  };

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await firebaseSignOut(auth);
      // onAuthStateChanged will handle setting user to null
    } catch (error) {
      console.error("Error signing out:", error);
      setAuthState(prev => ({ ...prev, loading: false, error: error as Error }));
    }
  };

  return { ...authState, signInWithGoogle, signOut };
}