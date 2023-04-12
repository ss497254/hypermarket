import { StaffType } from "src/types/StaffType";
import { create } from "zustand";

interface StaffStoreState {
  staff: StaffType | undefined;
  setStaff: (Staff: StaffType) => void;
  logout: () => void;
}

export const useStaffStore = create<StaffStoreState>()((set) => ({
  staff: undefined,
  setStaff: (staff) => set({ staff }),
  logout: () => set({}),
}));
