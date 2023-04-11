import { TextField } from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";
import { Button } from "../components/Button";
import { showToast } from "../lib/showToast";

const Login = () => {
  const router = useRouter();
  const { mutateAsync: login } = useMutation({});
  const nextPath = router.query.next && router.query.next.toString();
  const queryClient = useQueryClient();

  //   const formik = useFormik({
  //     initialValues: { email: "", password: "" },
  //     validationSchema: Yup.object({
  //       email: Yup.string()
  //         .email("Must be a valid email")
  //         .max(255)
  //         .required("Email is required"),
  //       password: Yup.string().max(255).required("Password is required"),
  //     }),
  //     onSubmit: async (values, { setErrors, setSubmitting }) => {
  //       try {
  //         const res: any = await login({ body: values, path: "/login" });
  //         if (res && res.user && res.user.userId) {
  //             queryClient.setQueryData("/user", res.user);
  //             router.push(nextPath || "/");
  //             showToast("Login successfully", "success");
  //         } else {
  //             showToast("Unable to Login", "error");
  //         }
  //       } catch (e) {
  //         console.log({ e });
  //         showToast("Unable to Login", "error");
  //       }
  //       setSubmitting(false);
  //     },
  //   });

  return (
    <>
      <Head>
        <title>Login | CeCe</title>
      </Head>
      <div className="flex items-center h-screen md:bg-blue-200">
        <div className="flex p-6 pt-20 mx-auto bg-white md:shadow-lg md:border md:p-10 rounded-xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <h4 className="text-4xl font-bold">Login</h4>
              <h4 className="my-2 text-md">Login on the internal platform</h4>
            </div>
            <TextField
              // error={Boolean(formik.touched.email && formik.errors.email)}
              // onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              // // helperText={formik.touched.email && formik.errors.email}
              // value={formik.values.email}
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              type="email"
              variant="outlined"
              sx={{
                ":hover": {
                  borderWidth: 2,
                },
              }}
            />
            <TextField
              // // error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              // // helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              // onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              type="password"
              // value={formik.values.password}
              variant="outlined"
              sx={{
                borderWidth: 2,
                ":hover": {
                  outline: "none",
                },
              }}
            />
            <div className="py-6">
              <Button
                // disabled={formik.isSubmitting}
                className="w-full h-12"
                // onClick={formik.handleSubmit}
                // loading={formik.isSubmitting}
              >
                Login
              </Button>
            </div>
            <div>
              Don&apos;t have an account?&nbsp;
              <Link
                href={
                  nextPath && nextPath.length
                    ? `/register?next=${nextPath}`
                    : "/register"
                }
              >
                <span className="font-bold text-blue-500 underline cursor-pointer">
                  Register
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
