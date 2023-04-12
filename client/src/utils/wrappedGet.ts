export function wrappedGet(url: string) {
  const promise = fetch(url, {
    credentials: "include",
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((x) => x.json());

  let status = "pending";
  let response: any;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    },
  );

  const handler: Record<string, any> = {
    pending: () => {
      throw suspender;
    },
    error: () => {
      throw response;
    },
    default: () => response,
  };

  const read = () => {
    const result = handler[status] ? handler[status]() : handler.default();
    return result;
  };

  return { read };
}
