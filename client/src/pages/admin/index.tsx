import AdminLayout from "src/components/layouts/AdminLayout";
import { useAdminStore } from "src/global-stores/useAdminStore";

const Home = () => {
  const { admin } = useAdminStore();

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-indigo-300">
      {admin?.username}
    </div>
  );
};

Home.getLayout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default Home;
