import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "src/global-stores/useAdminStore";
import { usePost } from "src/hooks/ApiHooks";
import { showToast } from "src/lib/showToast";
import { Button } from "src/ui/Button";
import { Input } from "src/ui/Input";

const Login = () => {
  const { run, loading, error } = usePost("/api/admin/login");
  const { register, handleSubmit, getValues } = useForm();
  const { setAdmin } = useAdminStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-indigo-300 flex items-center justify-center relative">
      <form
        className="p-6 lg:p-8 lg:w-[480px] w-[400px] bg-white dark:bg-slate-800 rounded-lg mx-4"
        onSubmit={handleSubmit(async (data: any) => {
          const res = await run(data);
          if (res.success) {
            setAdmin({ username: getValues("username") });
            return navigate("/admin");
          }

          showToast({ message: "Unable to login" }, "error");
        })}
      >
        <h4 className="md:text-3xl">Login to your account</h4>
        <div className="space-y-4 my-6">
          <Input
            label="Username"
            placeholder="Your Username"
            error={error}
            required
            {...register("username", { required: true })}
          />
          <Input
            label="Password"
            placeholder="Your password"
            error={error}
            type="password"
            required
            {...register("password", { required: true })}
          />
        </div>
        <Button className="w-full" loading={loading} size="large" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
