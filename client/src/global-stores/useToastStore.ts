import { IToast } from "src/types/ToastType";
import { generateId } from "src/utils/lodash";
import { create } from "zustand";

interface ToastState {
  toasts: IToast[];
  add: (x: Omit<IToast, "id">) => void;
  remove: (x: number) => void;
  resume: () => void;
  pause: () => void;
}

let timeouts = [] as NodeJS.Timeout[];
const DEFAULT_DURATION = 3000;

export const useToastStore = create<ToastState>()((set, get) => ({
  toasts: [],

  add: (t) =>
    set(({ toasts }) => {
      const newToast = { ...t, id: generateId() };
      const { remove } = get();

      timeouts.push(
        setTimeout(() => {
          remove(newToast.id);
        }, newToast.duration || DEFAULT_DURATION),
      );

      return { toasts: [...toasts.splice(-2), newToast] };
    }),

  remove: (id: number) =>
    set((x: ToastState) => ({
      toasts: x.toasts.filter((y: IToast) => y.id !== id),
    })),

  resume: () => {
    set(({ toasts }) => {
      const { remove } = get();

      toasts.forEach((toast) => {
        timeouts.push(
          setTimeout(() => {
            remove(toast.id);
          }, toast.duration || DEFAULT_DURATION),
        );
      });

      return { toasts };
    });
  },
  pause: () => {
    timeouts.forEach(clearTimeout);
    timeouts = [];
  },
}));
