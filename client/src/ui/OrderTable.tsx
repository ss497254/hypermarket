import React from "react";
import Spinner from "src/icons/Loading";
import { OrderType } from "src/types/OrderType";

interface OrderTableProps {
  orders: OrderType[];
  loading?: boolean;
  error?: boolean;
}

export const OrderTable: React.FC<OrderTableProps> = ({ orders, loading }) => {
  const noRecords = orders.length === 0;

  return (
    <div className="w-full overflow-x-scroll rounded-md shadow remove-scroll">
      <table className="w-full border border-collapse border-black table-auto">
        <thead className="text-gray-700 bg-blue-50 rounded-t-md">
          <tr>
            <th className="w-[5%] px-6 py-3 border">Id</th>
            <th className="w-1/4 px-6 py-3 border">Staff username</th>
            <th className="w-[20%] px-6 py-3 border">Amount</th>
            <th className="w-1/4 px-6 py-3 border">Payment method</th>
            <th className="w-1/4 px-6 py-3 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="h-64 bg-white border">
                <Spinner size={32} className="mx-auto" />
              </td>
            </tr>
          ) : noRecords ? (
            <tr>
              <td colSpan={6} className="h-64 text-center bg-white border">
                <h4>No orders found.</h4>
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id} className="bg-white">
                <td className="w-[5%] text-center py-3 border">{order.id}</td>
                <td className="w-1/4 px-6 py-3 border">
                  {order.staff_username}
                </td>
                <td className="w-[20%] px-6 py-3 border">{order.amount}</td>
                <td className="w-1/4 px-6 py-3 border">
                  {order.payment_method}
                </td>
                <td className="w-1/4 px-6 py-3 border">
                  {order.date.replace("T", " ").replace(":00Z", "")}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
