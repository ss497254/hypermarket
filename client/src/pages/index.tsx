import React from "react";
import { Logo } from "src/ui/Logo";

const Home = () => {
  return (
    <div className="flex-col h-screen space-y-4 c">
      <Logo size={180} />
      <h2>Welcome</h2>
      <p className="max-w-lg mx-6 text-lg text-center text-gray-700">
        Hypermarket, a supermarket automation system is a comprehensive solution
        for streamlining the operations of a supermarket.
      </p>
    </div>
  );
};

export default Home;
