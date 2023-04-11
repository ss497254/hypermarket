import withAdminLayout from "src/components/layouts/AdminLayout";
import { useAdminStore } from "src/global-stores/useAdminStore";

const Home = () => {
  const { admin } = useAdminStore();

  return (
    <div className="min-h-screen bg-indigo-300 flex items-center justify-center relative">
      {admin?.username}
    </div>
  );
};

export default withAdminLayout(Home);
