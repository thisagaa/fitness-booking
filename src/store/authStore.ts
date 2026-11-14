import { create } from "zustand";

interface AuthState {
  token: string | null
  signIn: () => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  signIn: () => set({token: 'demo-session'}),
  signOut: () => set({token: null}),
}))