import { UserRole } from "@/types/auth-types";
import { create } from "zustand";

interface userRoleState {
  email?: string;
  userRole?: UserRole;
  setuserRole: (userRole: UserRole) => void;
  setEmail: (email: string) => void;
}

export const useRoles = create<userRoleState>((set) => ({
  email: '',
  userRole: 'ADMIN',
  setuserRole: (userRole) => set({ userRole }),
  setEmail: (email) => set({ email }),
}));
