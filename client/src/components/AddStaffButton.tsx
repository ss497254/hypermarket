import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { usePost } from "src/hooks/ApiHooks";
import { showToast } from "src/lib/showToast";
import { StaffType } from "src/types/StaffType";
import { Button } from "src/ui/Button";
import { Input } from "src/ui/Input";
import { StyledModal } from "src/ui/StyledModal";
import { TextArea } from "src/ui/TextArea";

interface props {
  onSave: (x: StaffType) => void;
}

export const AddStaffButton: React.FC<props> = memo(({ onSave }) => {
  const [open, setOpen] = useState(false);
  const { run, loading, error } = usePost("/api/admin/staffs");
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
              btn="success"
              className="!px-10"
              loading={loading}
              onClick={handleSubmit(
                async (data: any) => {
                  const res = await run(data);
                  if (res && res.success) {
                    onSave({
                      ...data,
                    });
                    setOpen(false);
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
            <Button
              btn="danger"
              className="!px-8 mr-4"
              onClick={() => setOpen(false)}
            >
              Cancel
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
        <div className="space-y-4 md:f md:space-y-0 md:space-x-4">
          <Input
            label="Username"
            containerClassName="flex-grow"
            required
            {...register("username", { required: true })}
          />
          <Input
            label="Mobile"
            type="number"
            containerClassName="flex-grow"
            required
            {...register("mobile", { required: true, valueAsNumber: true })}
          />
        </div>
        <Input
          label="Password"
          type="password"
          required
          {...register("password", { required: true })}
        />
        <TextArea
          label="Address"
          required
          {...register("address", { required: true })}
        />
      </StyledModal>
    </>
  );
});
