import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { usePost } from "src/hooks/ApiHooks";
import { Button } from "src/ui/Button";
import { Input } from "src/ui/Input";

const Login = () => {
  const { run, loading, error } = usePost("/api/admin/login");
  const { register, handleSubmit, reset } = useForm();

  return (
    <div className="min-h-screen bg-indigo-300 flex items-center justify-center relative">
      <form
        className="p-6 lg:p-8 lg:w-[480px] w-[400px] bg-white dark:bg-slate-800 rounded-lg mx-4"
        onSubmit={handleSubmit((data: any) => {
          run(data);
          reset();
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

        <div className="w-full flex flex-row justify-between mt-4">
          <p className="inline">
            <Link
              className="font-medium text-blue-500 dark:text-blue-400 hover:underline"
              to="/register"
            >
              Register
            </Link>
          </p>
          <p className="inline">
            <Link
              className="font-medium text-blue-500 dark:text-blue-400 hover:underline"
              to="/forgot-password"
            >
              Forgot your password?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
