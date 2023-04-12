import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "src/lib/showToast";
import { ProductType } from "src/types/ProductType";
import { Button } from "src/ui/Button";
import { Input } from "src/ui/Input";
import { StyledModal } from "src/ui/StyledModal";

interface props {
  onSave: (x: ProductType) => void;
}

export const CreateProductButton: React.FC<props> = memo(({ onSave }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  return (
    <>
      <Button className="!px-8" onClick={() => setOpen(!open)}>
        Add Product
      </Button>
      <StyledModal
        className="max-w-lg w-[90vw] space-y-4 flex-c"
        heading="Create Product"
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
        <Input
          label="Name"
          containerClassName="flex-grow"
          required
          {...register("name", { required: true })}
        />
        <Input
          label="Price"
          type="number"
          required
          {...register("price", { required: true, min: 0 })}
        />
        <Input
          label="Quantity"
          type="number"
          required
          {...register("quantity", { required: true, min: 0 })}
        />
      </StyledModal>
    </>
  );
});
