import { memo } from "react";
import { CloseIcon, Help, SolidCloseIcon, SolidTick, Warning } from "src/icons";

const STACKING_OVERLAP = 0.9;
const notification_types = {
  success: <SolidTick size={26} />,
  error: <SolidCloseIcon size={24} />,
  info: <Help size={22} />,
  warning: <Warning size={20} />,
};

export interface ToastProps {
  id: number;
  index: number;
  total: number;
  message: string;
  type: keyof typeof notification_types;
  desc?: string;
  remove: (id: number) => void;
}

export const Toast = memo(
  ({ id, message, desc, type, index, total, remove }: ToastProps) => {
    const icon = notification_types[type];
    const inverseIndex = total - index - 1;
    const scale = 1 - inverseIndex * 0.06;
    const opacity = 100 - (inverseIndex / total) * 100;
    const y = inverseIndex * 100 * STACKING_OVERLAP;

    return (
      <div
        className="toast"
        style={
          {
            "--scale": scale,
            "--y": `${y}%`,
            "--opacity": `${opacity}%`,
          } as any
        }
      >
        <div className="toast-inner">
          <div className={`icon ${type}`}>{icon}</div>
          <div className="toast-content">
            <h4>{message}</h4>
            <p>{desc}</p>
          </div>
          <button
            className="close outline-none ring-0"
            onClick={() => remove(id)}
          >
            <CloseIcon size={18} />
          </button>
        </div>
      </div>
    );
  },
);
