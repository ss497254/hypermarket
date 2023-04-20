import React, { memo, useRef, useState } from "react";
import { useGet, usePost } from "src/hooks/ApiHooks";
import { Plus, Trash } from "src/icons";
import { ProductType } from "src/types/ProductType";
import { Button } from "./Button";
import { Input } from "./Input";
import { StyledModal } from "./StyledModal";
import { useForceRender } from "src/hooks/useForceRender";
import { OrderType } from "src/types/OrderType";
import ReactToPrint from "react-to-print";
import { RadioButtons } from "./RadioButtons";
import { useStaffStore } from "src/global-stores/useStaffStore";

interface OrderMenuTableProps {
  onSubmit: (x: OrderType) => void;
}
const rows = new Map();
const itemQuantity = new Map();
let render: () => void;

const OrderRow = memo(
  ({ id, name, price, setAmount }: ProductType & { setAmount: any }) => {
    const [value, setValue] = useState("");
    const parsedValue = price * (parseInt(value) || 0);

    return (
      <tr className="bg-white">
        <td className="w-[10%] border text-center">{id}</td>
        <td className="w-[50%] px-3 border">{name}</td>
        <td className="w-[15%] border px-3">{price}</td>
        <td className="w-[15%] border">
          <input
            type="number"
            value={value}
            onChange={(e) => {
              setAmount(
                (amount: number) =>
                  amount -
                  parsedValue +
                  price * (parseInt(e.target.value) || 0),
              );
              setValue(e.target.value);
              itemQuantity.set(id, { id, quantity: e.target.value });
            }}
            className="p-2 mx-3 border max-w-[120px] border-gray-400 rounded outline-none w-max"
          />
        </td>
        <td className="px-3 border">{parsedValue}</td>
        <td className="px-4 py-2 border">
          <Button
            btn="danger"
            size="xs"
            className="ml-auto w-9 h-9"
            onClick={() => {
              rows.delete(id);
              setAmount((amount: number) => amount - parsedValue);
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
  const [payment_method, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState(0);
  const tableRef = useRef<any>();
  const { staff } = useStaffStore();
  const { run, loading } = usePost("/api/staff/orders");

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
              onBeforePrint={async () => {
                if (!payment_method) return;

                const res = await run({
                  staff_username: staff?.username,
                  payment_method,
                  amount,
                  products: Array.from(itemQuantity.values()),
                });
                if (res && res.success) {
                }
              }}
              trigger={() => (
                <Button btn="success" className="!px-10" loading={loading}>
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
        <p className="mb-1 -mt-4">Payable amount {amount}.</p>
        <RadioButtons
          value={payment_method}
          onChange={setPaymentMethod}
          heading="Choose payment method"
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
              <OrderRow key={idx} setAmount={setAmount} {...product} />
            ))
          )}
          <tr className="bg-gray-100">
            <td colSpan={3} className="w-[60%] py-3 px-6 border">
              <Button onClick={() => setOpenProductModal(!openProductModal)}>
                <Plus className="mr-2" size={12} /> Add new product
              </Button>
            </td>
            <td className="w-[15%] p-3 text-center font-semibold border">
              Amount
            </td>
            <td className="w-[15%] p-3 font-semibold border">{amount}</td>
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
