import React, { useEffect, useState } from "react";

export const useClientOnly = () => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return !mount;
};
