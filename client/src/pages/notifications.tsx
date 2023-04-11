import { useToastStore } from "src/global-stores/useToastStore";
import { ToastTypes } from "src/types/ToastType";
import { randomNumberFromRange } from "src/utils/lodash";

const Notifications = () => {
  const { add } = useToastStore();

  return (
    <div className="c grow min-h-screen text-2xl font-bold">
      <button
        className="rounded-full text-white bg-blue-500 px-6 py-3"
        onClick={() => {
          const type = ToastTypes[randomNumberFromRange(3)];
          const message = `${type.toUpperCase()} notification`;
          add({
            message,
            desc: "Some notification description",
            type,
          });
        }}
      >
        Add Toast
      </button>
    </div>
  );
};

export default Notifications;
