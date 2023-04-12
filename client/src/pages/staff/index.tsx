import StaffLayout from "src/components/layouts/StaffLayout";
import { useAdminStore } from "src/global-stores/useAdminStore";

const Home = () => {
  const { admin } = useAdminStore();

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-indigo-300">
      {admin?.username}
    </div>
  );
};

Home.getLayout = (page: React.ReactNode) => <StaffLayout>{page}</StaffLayout>;

export default Home;
