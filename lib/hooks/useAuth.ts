import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { UserRole } from "@/lib/types/database";
import * as authService from "@/lib/services/auth";

interface AuthState {
  user: User | null;
  profile: any | null;
  loading: boolean;
  error: any | null;
  
  // Actions
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  clearError: () => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: false,
  error: null,

  signUp: async (email, password, name, role) => {
    set({ loading: true, error: null });
    try {
      const { user, error } = await authService.signUp({
        email,
        password,
        name,
        role,
      });

      if (error) throw error;
      set({ user, loading: false });
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { user, error } = await authService.signIn({ email, password });

      if (error) throw error;
      set({ user, loading: false });
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  signInWithGoogle: async () => {
    set({ loading: true, error: null });
    try {
      const { url, error } = await authService.signInWithGoogle();

      if (error) throw error;
      if (url) window.location.href = url;
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    try {
      const { error } = await authService.signOut();

      if (error) throw error;
      set({ user: null, profile: null, loading: false });
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  getCurrentUser: async () => {
    set({ loading: true, error: null });
    try {
      const { user, error } = await authService.getCurrentUser();

      if (error) throw error;

      if (user) {
        const { profile, error: profileError } = await authService.getUserProfile(user.id);
        if (profileError) throw profileError;
        set({ user, profile, loading: false });
      } else {
        set({ user: null, profile: null, loading: false });
      }
    } catch (error) {
      set({ error, loading: false });
    }
  },

  updateProfile: async (updates) => {
    set({ loading: true, error: null });
    try {
      const { user } = get();
      if (!user) throw new Error("No user logged in");

      const { profile, error } = await authService.updateUserProfile(user.id, updates);

      if (error) throw error;
      set({ profile, loading: false });
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  resetPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      const { error } = await authService.resetPassword(email);

      if (error) throw error;
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  updatePassword: async (newPassword) => {
    set({ loading: true, error: null });
    try {
      const { error } = await authService.updatePassword(newPassword);

      if (error) throw error;
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));

