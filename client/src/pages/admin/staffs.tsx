import { useCallback, useEffect } from "react";
import { AddStaffButton } from "src/components/AddStaffButton";
import AdminLayout from "src/components/layouts/AdminLayout";
import { useGet } from "src/hooks/ApiHooks";
import { useForceRender } from "src/hooks/useForceRender";
import { NextPageWithLayout } from "src/types/NextPageWithLayout";
import { StaffType } from "src/types/StaffType";
import { StaffTable } from "src/ui/StaffTable";

let staffs: StaffType[] = [];

const Staffs: NextPageWithLayout = () => {
  const render = useForceRender();

  const { run, loading, error } = useGet<{ data: StaffType[] }>(
    "/api/admin/staffs",
  );

  const onSave = useCallback((data: StaffType) => {
    staffs.push(data);
    render();
  }, []);

  useEffect(() => {
    run().then((res) => res && (staffs = res.data));
  }, []);

  return (
    <div className="max-w-5xl m-4 md:m-8">
      <div className="justify-between mt-8 mb-4 md:col-span-2 f">
        <h4>Staffs</h4>
        <AddStaffButton onSave={onSave} />
      </div>
      <StaffTable staffs={staffs} error={error} loading={loading} />
    </div>
  );
};

Staffs.getLayout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default Staffs;
