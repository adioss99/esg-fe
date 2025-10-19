/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * !Caution: Data in this store is persisted in localStorage
 * !Do NOT use this store for temporary data
 */

import { redirect } from "next/navigation";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  token?: string;
  _user?: string;
};

type PersistState = {
  lang: string;
  auth: AuthState;
  setLang: (newLang: string) => void;
  setAuthToken: (data: Partial<AuthState>) => void;
  logout: () => void;
};

export const usePersistStore = create<PersistState>()(
  persist(
    (set, _get) => ({
      lang: "id",
      auth: { token: undefined, _user: undefined },

      setLang: (newLang) => set({ lang: newLang }),
      setAuthToken: (data) =>
        set((state) => ({
          auth: {
            ...state.auth,
            token: data.token,
            _user: data._user,
          },
        })),

      logout: () => {
        (set({
          auth: { token: undefined, _user: undefined },
        }),
          redirect("/login"));
      },
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// setGetToken(() => usePersistStore.getState().auth.token);
