import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Head } from "src/components/Head";
import { ToastContainer } from "src/components/ToastContainer";
import "src/styles/fonts.css";
import "src/styles/globals.css";
import "src/styles/loading-animation.css";
import "src/styles/nprogress.css";
import "src/styles/scrollbar.css";
import "src/styles/toast.css";
import { LogoLoading } from "src/ui/LogoLoading";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

const Home = lazy(() => import("src/pages/index"));
const Notifications = lazy(() => import("src/pages/notifications"));
const Login = lazy(() => import("src/pages/login"));
const AdminRegister = lazy(() => import("src/pages/admin_register"));
const AdminLogin = lazy(() => import("src/pages/admin_login"));
const Error404 = lazy(() => import("src/pages/error404"));

const App = () => {
  return (
    <BrowserRouter>
      <Head />
      <ToastContainer />
      <Suspense fallback={<LogoLoading />}>
        <Routes>
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

root.render(<App />);
