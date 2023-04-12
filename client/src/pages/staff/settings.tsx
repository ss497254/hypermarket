import StaffLayout from "src/components/layouts/StaffLayout";

const Settings = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-indigo-300">
      Settings
    </div>
  );
};

Settings.getLayout = (page: React.ReactNode) => (
  <StaffLayout>{page}</StaffLayout>
);

export default Settings;
