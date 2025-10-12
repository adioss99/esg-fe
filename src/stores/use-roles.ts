import { UserRole } from "@/types/auth-types";
import { create } from "zustand";

interface userRoleState {
  userRole?: UserRole | undefined;
  setuserRole: (userRole: UserRole) => void;
}

export const useRoles = create<userRoleState>((set) => ({
  userRole: undefined,
  setuserRole: (userRole) => set({ userRole }),
}));
