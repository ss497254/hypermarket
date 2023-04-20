import React, { memo, useRef, useState } from "react";
import { useGet } from "src/hooks/ApiHooks";
import { Plus, Trash } from "src/icons";
import { ProductType } from "src/types/ProductType";
import { Button } from "./Button";
import { Input } from "./Input";
import { StyledModal } from "./StyledModal";
import { useForceRender } from "src/hooks/useForceRender";
import { OrderType } from "src/types/OrderType";
import ReactToPrint from "react-to-print";
import { InputRadio } from "./InputRadio";

interface OrderMenuTableProps {
  onSubmit: (x: OrderType) => void;
}
const rows = new Map();
let render: () => void;

const OrderRow = memo(
  ({ id, name, price, setTotal }: ProductType & { setTotal: any }) => {
    const [value, setValue] = useState("");
    const parsedValue = price * (parseInt(value) || 0);
    console.log(parsedValue);

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
              setTotal(
                (total: number) =>
                  total - parsedValue + price * (parseInt(e.target.value) || 0),
              );
              setValue(e.target.value);
            }}
            className="w-[90%] outline-none p-2 border rounded border-gray-400"
          />
        </td>
        <td className="text-center border">{parsedValue}</td>
        <td className="px-4 py-2 border">
          <Button
            btn="danger"
            size="xs"
            className="ml-auto w-9 h-9"
            onClick={() => {
              rows.delete(id);
              setTotal((total: number) => total - parsedValue);
              render?.();
            }}
          >
            <Trash size={14} />
          </Button>
        </td>
      </tr>
    );
  },
);

interface apProps {
  open: boolean;
  setOpen: (x: boolean) => void;
}
const AddProuductToTable = memo(({ open, setOpen }: apProps) => {
  const [id, setId] = useState<string>();
  const { run, loading } = useGet<{
    data: ProductType;
    success: boolean;
  }>("/api/products");

  return (
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
  );
});

export const OrderMenuTable: React.FC<OrderMenuTableProps> = ({ onSubmit }) => {
  render = useForceRender();
  const [openPrintModal, setOpenPrintModal] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [total, setTotal] = useState(0);
  const tableRef = useRef<any>();

  return (
    <div className="w-full overflow-x-scroll rounded-md shadow remove-scroll">
      <StyledModal
        open={openPrintModal}
        className="w-96"
        setOpen={setOpenPrintModal}
        heading="Complete order"
        footer={
          <>
            <ReactToPrint
              onBeforePrint={() => console.log(rows)}
              trigger={() => (
                <Button btn="success" className="!px-10">
                  Print
                </Button>
              )}
              content={() => tableRef.current}
            />
            <Button
              btn="danger"
              onClick={() => setOpenPrintModal(!openPrintModal)}
              className="!px-8 mr-4"
            >
              Cancel
            </Button>
          </>
        }
      >
        <p className="mb-1 -mt-4">Payable amount {total}.</p>
        <InputRadio
          value=""
          heading="Choose payment method"
          name="payment_method"
          options={["UPI", "Cash", "Debit Card"]}
        />
      </StyledModal>
      <AddProuductToTable
        open={openProductModal}
        setOpen={setOpenProductModal}
      />
      <table className="w-full border border-collapse" ref={tableRef}>
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
              <OrderRow key={idx} setTotal={setTotal} {...product} />
            ))
          )}
          <tr className="bg-gray-100">
            <td colSpan={3} className="w-[60%] py-3 px-6 border">
              <Button onClick={() => setOpenProductModal(!openProductModal)}>
                <Plus className="mr-2" size={12} /> Add new product
              </Button>
            </td>
            <td className="w-[15%] px-6 py-3 font-semibold border">G. Total</td>
            <td className="w-[15%] px-6 py-3 font-semibold border">{total}</td>
            <td className="px-4">
              <Button
                btn="success"
                className="w-full"
                onClick={() => setOpenPrintModal(!openPrintModal)}
              >
                Print
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
