import { useForm } from "react-hook-form";
import AdminLayout from "src/components/layouts/AdminLayout";
import { useAdminStore } from "src/global-stores/useAdminStore";
import { usePut } from "src/hooks/ApiHooks";
import { showToast } from "src/lib/showToast";
import { Button } from "src/ui/Button";
import { Card } from "src/ui/Card";
import { Input } from "src/ui/Input";

const Home = () => {
  const { admin } = useAdminStore();
  const { run, loading, error } = usePut("/api/admin/me");
  const { register, handleSubmit, reset } = useForm({
    values: { ...admin, password: "" },
  });

  return (
    <div className="relative min-h-screen p-8 bg-indigo-300">
      <Card
        heading="Admin Details"
        className="space-y-4"
        footer={
          <Button
            className="!w-40"
            loading={loading}
            onClick={handleSubmit(
              async (data: any) => {
                const res = await run(data);
                if (res && res.success) {
                  reset();
                } else {
                }
              },
              () => {
                showToast({ message: "Cannot add staff" }, "error");
              },
            )}
          >
            Save
          </Button>
        }
      >
        <Input
          label="Username"
          containerClassName="flex-grow"
          required
          {...register("username", { required: true })}
        />
        <Input
          label="Firstname"
          containerClassName="flex-grow"
          required
          {...register("firstName", { required: true })}
        />
        <Input
          label="Lastname"
          containerClassName="flex-grow"
          required
          {...register("lastName", { required: true })}
        />
        <Input
          label="Password"
          type="password"
          required
          {...register("password", { required: true })}
        />
      </Card>
    </div>
  );
};

Home.getLayout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default Home;
