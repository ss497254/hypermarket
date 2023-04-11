import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "src/ui/Button";

const Error404 = () => {
  const [show404, setShow404] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShow404(true);
    }, 500);
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-gray-100">
      <div
        className={`select-none opacity-10 text-gray-900 transition duration-200${
          show404 ? "blur-sm" : "blur-none"
        }`}
      >
        <h1 style={{ fontSize: "35vw" }}>404</h1>
      </div>
      <div
        className={`absolute z-10 flex flex-col items-center justify-center space-y-6 transition ${
          show404 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex w-[380px] flex-col items-center justify-center space-y-3 text-center">
          <h3 className="text-2xl text-blue-500">Looking for something? 🔍</h3>
          <p>We couldn't find the page that you're looking for!</p>
        </div>
        <Link to="/">
          <Button className="font-semibold" size="medium">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
