import StaffLayout from "src/components/layouts/StaffLayout";

const Orders = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-indigo-300">
      Orders
    </div>
  );
};

Orders.getLayout = (page: React.ReactNode) => <StaffLayout>{page}</StaffLayout>;

export default Orders;
