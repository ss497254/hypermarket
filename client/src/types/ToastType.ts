export const ToastTypes = ["error", "success", "info", "warning"] as const;

export type ToastType = (typeof ToastTypes)[number];

export interface IToast {
  id: number;
  duration?: number;
  type: ToastType;
  message: string;
  desc?: string;
}
