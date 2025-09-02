import type { AllMethods } from "numerical-methods";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MethodStore {
  method: AllMethods | undefined;
  setMethod: (method: AllMethods) => void;
}

export const useMethodStore = create<MethodStore>()(
  persist(
    (set, get) => ({
      method: undefined,
      setMethod: method => set({ method }),
    }),
    {
      name: "method-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
