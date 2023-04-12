import AdminLayout from "src/components/layouts/AdminLayout";
import { LogoutCard } from "src/ui/LogoutCard";

const Settings = () => {
  return (
    <div className="max-w-5xl min-h-screen m-4 md:m-8">
      <LogoutCard path="/api/admin/logout" />
    </div>
  );
};

Settings.getLayout = (page: React.ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);

export default Settings;
