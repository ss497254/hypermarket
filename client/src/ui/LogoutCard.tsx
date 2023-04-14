import { useState } from "react";
import { usePost } from "src/hooks/ApiHooks";
import { LogOut } from "src/icons";
import { showToast } from "src/lib/showToast";
import { Button } from "./Button";
import { StyledModal } from "./StyledModal";

interface LogoutCardProps {
  path: string;
}

export const LogoutCard: React.FC<LogoutCardProps> = ({ path }) => {
  const { run, loading } = usePost(path);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    const res = await run();
    if (res && res.success) {
      showToast({ message: "Logout successfully" }, "success");
      window.location.pathname = "/";
    } else {
      showToast({ message: "Unable to logout, do it manually" }, "error");
    }
  };

  return (
    <>
      <StyledModal
        open={modalOpen}
        setOpen={setModalOpen}
        heading="Log out"
        footer={
          <Button
            btn="danger"
            className="w-36"
            loading={loading}
            onClick={handleLogout}
          >
            Log out
          </Button>
        }
      >
        Are you sure to log out your account?
      </StyledModal>
      <div className="flex flex-col bg-white rounded-lg shadow-md lg:w-1/2">
        <h4 className="p-8 py-6 text-2xl font-bold">Log out</h4>
        <hr />
        <div className="h-full p-8">Logout from your account</div>
        <hr />
        <div className="flex justify-end p-4 bg-gray-100 rounded-b-lg">
          <Button
            btn="danger"
            className="w-40"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <LogOut className="mr-2 -ml-2" />
            Log out
          </Button>
        </div>
      </div>
    </>
  );
};
