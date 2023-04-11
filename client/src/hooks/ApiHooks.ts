import { useCallback, useState } from "react";
import { showToast } from "src/lib/showToast";

export interface QueryOptions {
  initialValue?: unknown;
}

const DefaultHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const useGet = <T>(path: string, options?: QueryOptions) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const run = useCallback(
    async (parameter = "") => {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(path + parameter, {
          credentials: "include",
          method: "GET",
          headers: DefaultHeader,
        });

        if (
          res.ok &&
          res.headers.get("Content-Type")?.includes("application/json")
        ) {
          const x: T = await res.json();
          setLoading(false);

          return x;
        }

        throw new Error(await res.text());
      } catch (e) {
        showToast(
          {
            message: "API ERROR",
            desc: (e as Error).message,
          },
          "error",
        );
      }

      setLoading(false);
      setError(true);
      return options?.initialValue;
    },
    [options?.initialValue, path],
  );

  return { loading, error, run };
};

export const usePost = (path: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const run = useCallback(
    async (data: unknown = {}) => {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(path, {
          credentials: "include",
          headers: DefaultHeader,
          method: "POST",
          body: JSON.stringify(data),
        });

        if (
          res.ok &&
          res.headers.get("Content-Type")?.includes("application/json")
        ) {
          setLoading(false);
          return res.json();
        }

        throw new Error(await res.text());
      } catch (e) {
        showToast(
          {
            message: "API ERROR",
            desc: (e as Error).message,
          },
          "error",
        );
      }

      setLoading(false);
      setError(true);
      return null;
    },
    [path],
  );

  return { loading, error, run };
};

export const useDelete = (path: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const run = useCallback(
    async (data: unknown = {}) => {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(path, {
          credentials: "include",
          headers: DefaultHeader,
          method: "DELETE",
          body: JSON.stringify(data),
        });

        if (
          res.ok &&
          res.headers.get("Content-Type")?.includes("application/json")
        ) {
          setLoading(false);
          return res.json();
        }

        throw new Error(await res.text());
      } catch (e) {
        showToast(
          {
            message: "API ERROR",
            desc: (e as Error).message,
          },
          "error",
        );
      }

      setLoading(false);
      setError(true);
      return null;
    },
    [path],
  );

  return { loading, error, run };
};
