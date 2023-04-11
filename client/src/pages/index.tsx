import React from "react";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="h-screen c flex-col">
      <h2>Welcome</h2>
      <p className="text-lg text-emerald-500 font-semibold">
        Still in progress...
      </p>
    </div>
  );
};

export default Home;
