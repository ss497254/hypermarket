import { debounced } from "src/utils/lodash";
import { create } from "zustand";

interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSizeStore = create<WindowSize>()(() => ({
  width: window.innerWidth,
  height: window.innerHeight,
}));

window.addEventListener(
  "resize",
  debounced(() => {
    useWindowSizeStore.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 200),
);
