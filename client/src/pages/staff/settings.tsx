import StaffLayout from "src/components/layouts/StaffLayout";
import { LogoutCard } from "src/ui/LogoutCard";

const Settings = () => {
  return (
    <div className="max-w-5xl min-h-screen m-4 md:m-8">
      <LogoutCard path="/api/staff/logout" />
    </div>
  );
};

Settings.getLayout = (page: React.ReactNode) => (
  <StaffLayout>{page}</StaffLayout>
);

export default Settings;
