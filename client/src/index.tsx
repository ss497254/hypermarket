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

const Login = lazy(() => import("src/pages/login"));
const Home = lazy(() => import("src/pages/index"));
const Notifications = lazy(() => import("src/pages/notifications"));

const AdminLogin = lazy(() => import("src/pages/admin/login"));
const AdminLayout = lazy(() => import("src/components/layouts/AdminLayout"));
const AdminHome = lazy(() => import("src/pages/admin/index"));
const AdminSales = lazy(() => import("src/pages/admin/sales"));
const AdminProducts = lazy(() => import("src/pages/admin/products"));
const AdminStaffs = lazy(() => import("src/pages/admin/staffs"));
const AdminSettings = lazy(() => import("src/pages/admin/settings"));

const Error404 = lazy(() => import("src/pages/error404"));

const App = () => {
  return (
    <BrowserRouter>
      <Head />
      <ToastContainer />
      <Suspense fallback={<LogoLoading />}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/sales" element={<AdminSales />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/staffs" element={<AdminStaffs />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>

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
