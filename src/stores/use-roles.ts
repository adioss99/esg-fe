import { UserRole } from "@/types/auth-types";
import { create } from "zustand";

interface userRoleState {
  email?: string;
  userRole?: UserRole | null;
  setuserRole: (userRole: UserRole) => void;
  setEmail: (email: string) => void;
  reset: () => void;
}

export const useRoles = create<userRoleState>((set) => ({
  email: "",
  userRole: null,
  setuserRole: (userRole) => set({ userRole }),
  setEmail: (email) => set({ email }),
  reset: () => set({ email: "", userRole: null }),
}));
