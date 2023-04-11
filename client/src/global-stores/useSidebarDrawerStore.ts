import { create } from "zustand";

interface DrawerState {
  open: boolean;
  toggleOpen: () => void;
}

export const useSidebarDrawerStore = create<DrawerState>()((set) => ({
  open: false,
  toggleOpen: () => set(({ open }) => ({ open: !open })),
}));
