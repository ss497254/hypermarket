import { useState, useEffect, useCallback } from "react";

export const useMedia = <T>(
  queries: string[],
  values: T[],
  defaultValue: T,
) => {
  const mediaQueryLists = queries.map((q) => window.matchMedia(q));

  const getValue = useCallback(() => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    return values?.[index] || defaultValue;
  }, [defaultValue, mediaQueryLists, values]);

  const [value, setValue] = useState<T>(getValue);
  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach((mql) => mql.addListener(handler));

    return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
  }, [getValue, mediaQueryLists]);
  return value;
};
