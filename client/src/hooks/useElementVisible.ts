import { useCallback, useEffect, useRef } from "react";

export const useElementVisible = (
  cb: () => void,
  options?: IntersectionObserverInit,
) => {
  const elementRef = useRef(null);

  const callbackFunction: IntersectionObserverCallback = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) cb?.();
    },
    [cb],
  );

  useEffect(() => {
    const ele = elementRef.current;

    const observer = new IntersectionObserver(callbackFunction, options);
    if (ele) observer.observe(ele);

    return () => {
      if (ele) observer.unobserve(ele);
    };
  }, [callbackFunction, elementRef, options]);

  return { elementRef };
};
