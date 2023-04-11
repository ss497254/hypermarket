import { useState, useRef } from "react";

export default function useLongPress() {
  const [longpress, setLongPress] = useState(false);

  const timerRef = useRef<NodeJS.Timeout>();
  const isLongPress = useRef(false);

  function startPressTimer() {
    isLongPress.current = false;

    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setLongPress(true);
    }, 500);
  }

  const onClick = () => {
    if (isLongPress.current) return;

    setLongPress(false);
  };

  const onMouseDown = () => {
    startPressTimer();
  };

  const onMouseUp = () => {
    clearTimeout(timerRef.current);
  };

  const onTouchStart = () => {
    startPressTimer();
  };

  const onTouchEnd = () => {
    if (longpress) return;

    clearTimeout(timerRef.current);
  };

  return {
    longpress,
    handlers: {
      onClick,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
    },
  };
}
