import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { usePost } from "src/hooks/ApiHooks";
import { showToast } from "src/lib/showToast";
import { ProductType } from "src/types/ProductType";
import { Button } from "src/ui/Button";
import { Input } from "src/ui/Input";
import { StyledModal } from "src/ui/StyledModal";

interface props {
  onSave: (x: ProductType) => void;
}

export const AddProductButton: React.FC<props> = memo(({ onSave }) => {
  const [open, setOpen] = useState(false);
  const { run, loading, error } = usePost("/api/products");
  const { register, handleSubmit, reset } = useForm();

  return (
    <>
      <Button
        className="!px-8"
        loading={loading}
        onClick={() => setOpen(!open)}
      >
        Add Product
      </Button>
      <StyledModal
        className="max-w-lg w-[90vw] space-y-4 flex-c"
        heading="Add Product"
        open={open}
        setOpen={setOpen}
        footer={
          <>
            <Button
              btn="success"
              className="!px-10"
              onClick={handleSubmit(
                async (data: any) => {
                  const res = await run(data);
                  if (res.success) {
                    onSave({
                      ...data,
                    });
                    setOpen(false);
                    reset();
                  } else {
                  }
                },
                () => {
                  showToast({ message: "Cannot add product" }, "error");
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
