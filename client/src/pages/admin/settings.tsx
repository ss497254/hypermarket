import AdminLayout from "src/components/layouts/AdminLayout";

const Settings = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-indigo-300">
      settings
    </div>
  );
};

Settings.getLayout = (page: React.ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);

export default Settings;
