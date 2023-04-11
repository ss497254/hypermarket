import { AdminType } from "src/types/AdminType";
import { create } from "zustand";

interface AdminStoreState {
  admin: AdminType | undefined;
  setAdmin: (admin: AdminType) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminStoreState>()((set) => ({
  admin: undefined,
  setAdmin: (admin) => set({ admin }),
  logout: () => set({}),
}));
