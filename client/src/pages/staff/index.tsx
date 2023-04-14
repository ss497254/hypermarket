import StaffLayout from "src/components/layouts/StaffLayout";
import { useStaffStore } from "src/global-stores/useStaffStore";
import { Card } from "src/ui/Card";
import { Input } from "src/ui/Input";
import { OrderMenuTable } from "src/ui/OrderMenuTable";

const Home = () => {
  const { staff } = useStaffStore();

  return (
    <div className="max-w-5xl m-4 md:m-8">
      <OrderMenuTable />
    </div>
  );
};

Home.getLayout = (page: React.ReactNode) => <StaffLayout>{page}</StaffLayout>;

export default Home;
