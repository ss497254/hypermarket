import { CreateStaffButton } from "src/components/CreateStaffButton";
import { useForceRender } from "src/hooks/useForceRender";
import { StaffType } from "src/types/StaffType";

const staffs: StaffType[] = [];

let render: () => void;
const onSave = (staff: StaffType) => {
  staffs.push(staff);
  render();
};

const Staffs = () => {
  render = useForceRender();

  return (
    <div className="grid p-1 pb-6 bg-indigo-300 md:p-4 bg-dark-900 md:grid-cols-2">
      <div className="justify-between m-4 mt-8 md:col-span-2 f">
        <h4>Staffs</h4>
        <CreateStaffButton onSave={onSave} />
      </div>
      {staffs.map((staff) => (
        <pre className="h-screen whitespace-pre-line">
          {JSON.stringify(staff)}
        </pre>
      ))}
    </div>
  );
};

export default Staffs;
