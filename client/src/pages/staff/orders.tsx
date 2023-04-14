import { useEffect } from "react";
import StaffLayout from "src/components/layouts/StaffLayout";
import { useGet } from "src/hooks/ApiHooks";
import { OrderType } from "src/types/OrderType";
import { OrderTable } from "src/ui/OrderTable";

let orders: OrderType[] = [];

const Sales = () => {
  const { run, loading, error } = useGet<{ data: OrderType[] }>(
    "/api/staff/orders",
  );

  useEffect(() => {
    run().then((res) => res && (orders = res.data));
  }, []);

  return (
    <div className="max-w-5xl m-4 md:m-8">
      <div className="justify-between my-6 md:col-span-2 f">
        <h4>Sales</h4>
      </div>
      <OrderTable orders={orders} error={error} loading={loading} />
    </div>
  );
};

Sales.getLayout = (page: React.ReactNode) => <StaffLayout>{page}</StaffLayout>;

export default Sales;
