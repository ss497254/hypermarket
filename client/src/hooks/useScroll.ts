import { useRef } from "react";

export const useChatScroll = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>();

  return {
    ref,
    scroll: () => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    },
  };
};
