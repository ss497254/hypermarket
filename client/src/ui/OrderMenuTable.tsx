import React, { memo, useState } from "react";
import { useGet } from "src/hooks/ApiHooks";
import { Plus, Trash } from "src/icons";
import { ProductType } from "src/types/ProductType";
import { Button } from "./Button";
import { Input } from "./Input";
import { StyledModal } from "./StyledModal";
import { useForceRender } from "src/hooks/useForceRender";

interface OrderMenuTableProps {}
const rows = new Map();
let render: () => void;

const Row = memo(
  ({ id, name, price, setTotal }: ProductType & { setTotal: any }) => {
    const [value, setValue] = useState(0);

    return (
      <tr className="bg-white">
        <td className="w-[10%] border text-center">{id}</td>
        <td className="w-[50%] px-3 border">{name}</td>
        <td className="w-[15%] border text-center">{price}</td>
        <td className="w-[15%] border text-center">
          <input
            type="number"
            value={value}
            onChange={(e) => {
              setTotal((total: number) => {
                total -= price * (value || 0);
                return total + price * (parseInt(e.target.value) || 0);
              });
              setValue(parseInt(e.target.value));
            }}
            className="w-[90%] outline-none p-2 border rounded border-gray-400"
          />
        </td>
        <td className="text-center border">{(value || 0) * price}</td>
        <td className="px-4 py-2 border">
          <Button
            btn="danger"
            size="xs"
            className="ml-auto w-9 h-9"
            onClick={() => {
              rows.delete(id);
              render?.();
              setTotal((total: number) => total - price * (value || 0));
            }}
          >
            <Trash size={14} />
          </Button>
        </td>
      </tr>
    );
  },
);

export const OrderMenuTable: React.FC<OrderMenuTableProps> = () => {
  const [open, setOpen] = useState(false);
  render = useForceRender();
  const [id, setId] = useState<string>();
  const [total, setTotal] = useState(0);
  const { run, loading } = useGet<{
    data: ProductType;
    success: boolean;
  }>("/api/products");

  return (
    <div className="w-full overflow-x-scroll rounded-md shadow remove-scroll">
      <StyledModal
        open={open}
        className="w-96"
        setOpen={setOpen}
        heading="Add new product to order"
        footer={
          <>
            <Button
              btn="success"
              loading={loading}
              className="!px-10"
              onClick={async () => {
                const res = await run(`/${id}`);
                if (res && res.success) {
                  rows.set(res.data.id, res.data);
                  setOpen(!open);
                  setId(undefined);
                }
              }}
            >
              Save
            </Button>
            <Button
              btn="danger"
              onClick={() => setOpen(!open)}
              className="!px-8 mr-4"
            >
              Cancel
            </Button>
          </>
        }
      >
        <Input
          label="Product Id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          type="number"
        />
      </StyledModal>
      <table className="w-full border border-collapse">
        <thead className="bg-blue-100 rounded-t-md">
          <tr>
            <th className="w-[10%] py-3 border">Id</th>
            <th className="w-[50%] px-6 py-3 border">Product Name</th>
            <th className="w-[15%] py-3 border">Price</th>
            <th className="w-[15%] py-3 border">Quantity</th>
            <th className="w-[15%] py-3 border">Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.size === 0 ? (
            <tr>
              <td colSpan={6} className="h-32 text-center bg-white border">
                <h4>Add product to order.</h4>
              </td>
            </tr>
          ) : (
            Array.from(rows.values()).map((product, idx) => (
              <Row key={idx} setTotal={setTotal} {...product} />
            ))
          )}
          <tr className="bg-gray-100">
            <td colSpan={3} className="w-[60%] py-3 px-6 border">
              <Button onClick={() => setOpen(!open)}>
                <Plus className="mr-2" size={12} /> Add new product
              </Button>
            </td>
            <td className="w-[15%] px-6 py-3 font-semibold border">G. Total</td>
            <td className="w-[15%] px-6 py-3 font-semibold border">{total}</td>
            <td className="px-4">
              <Button btn="success" className="w-full">
                Print
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
