import AdminLayout from "src/components/layouts/AdminLayout";

const Sales = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-indigo-300">
      sales
    </div>
  );
};

Sales.getLayout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default Sales;
