import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { usePost } from "src/hooks/ApiHooks";
import { Button } from "src/ui/Button";
import { Input } from "src/ui/Input";

const Register = () => {
  const { run, loading, error } = usePost("/api/admin/register");
  const { register, handleSubmit, reset } = useForm();

  return (
    <div className="min-h-screen bg-indigo-300 flex items-center justify-center relative">
      <form
        className="p-6 lg:p-8 max-w-2xl w-full bg-white dark:bg-slate-800 rounded-lg mx-4"
        onSubmit={handleSubmit((data: any) => {
          run(data);
          reset();
        })}
      >
        <h4 className="md:text-3xl">Register to your account</h4>
        <div className="space-y-4 my-6">
          <div className="md:flex w-full md:space-x-4">
            <Input
              label="Firstname"
              placeholder="Your firstname"
              error={error}
              containerClassName="flex-grow"
              required
              {...register("firstName", { required: true })}
            />
            <Input
              label="Lastname"
              placeholder="Your lastname"
              error={error}
              containerClassName="flex-grow"
              required
              {...register("lastName", { required: true })}
            />
          </div>
          <Input
            label="Username"
            placeholder="Your username"
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
        <Button className="w-full" size="large" loading={loading} type="submit">
          Submit
        </Button>

        <div className="w-full flex flex-row justify-between mt-4">
          <p className="inline">
            Already have an account,&nbsp;
            <Link
              className="font-medium text-blue-500 dark:text-blue-400 hover:underline"
              to="/register"
            >
              login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
