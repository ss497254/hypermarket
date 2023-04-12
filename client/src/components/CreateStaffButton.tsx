import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "src/lib/showToast";
import { StaffType } from "src/types/StaffType";
import { Button } from "src/ui/Button";
import { Input } from "src/ui/Input";
import { StyledModal } from "src/ui/StyledModal";

interface props {
  onSave: (x: StaffType) => void;
}

export const CreateStaffButton: React.FC<props> = memo(({ onSave }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  return (
    <>
      <Button className="!px-8" onClick={() => setOpen(!open)}>
        Add Staff
      </Button>
      <StyledModal
        className="max-w-xl w-[90vw] space-y-4 flex-c"
        heading="Create staff"
        open={open}
        setOpen={setOpen}
        footer={
          <>
            <Button
              btn="danger"
              className="!px-8 mr-4"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              btn="success"
              className="!px-10"
              onClick={handleSubmit(
                (data: any) => {
                  onSave({
                    ...data,
                    id: new Date().getTime(),
                  });
                  setOpen(false);
                  reset();
                },
                () => {
                  showToast({ message: "Cannot create channel" }, "error");
                },
              )}
            >
              Save
            </Button>
          </>
        }
      >
        <div className="space-y-4 md:f md:space-y-0 md:space-x-4">
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
        </div>
        <Input
          label="Username"
          required
          {...register("username", { required: true })}
        />
        <Input
          label="Password"
          type="password"
          required
          {...register("password", { required: true })}
        />
      </StyledModal>
    </>
  );
});
