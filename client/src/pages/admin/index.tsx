import { useAdminStore } from "src/global-stores/useAdminStore";

const Home = () => {
  const { admin } = useAdminStore();

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-indigo-300">
      {admin?.username}
    </div>
  );
};

export default Home;
