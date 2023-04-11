import { useState } from "react";

export const useForceRender = () => {
  const [, update] = useState({});

  return () => update({});
};
