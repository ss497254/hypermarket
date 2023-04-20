import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { usePut } from "src/hooks/ApiHooks";
import { showToast } from "src/lib/showToast";
import { ProductType } from "src/types/ProductType";
import { Button } from "src/ui/Button";
import { Input } from "src/ui/Input";
import { StyledModal } from "src/ui/StyledModal";

interface props {
  onEdit: (x: ProductType) => void;
}

export const EditProductButton: React.FC<props> = memo(({ onEdit }) => {
  const [open, setOpen] = useState(false);
  const { run, loading } = usePut("/api/products");
  const { register, handleSubmit, reset } = useForm();

  return (
    <>
      <Button className="!px-8" onClick={() => setOpen(!open)}>
        Edit Product
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
              loading={loading}
              onClick={handleSubmit(
                async (data: any) => {
                  const res = await run(data);
                  if (res && res.success) {
                    onEdit({
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
          label="Id"
          type="number"
          containerClassName="flex-grow"
          required
          {...register("id", { required: true })}
        />
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
