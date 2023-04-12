import React from "react";
import Spinner from "src/icons/Loading";
import { ProductType } from "src/types/ProductType";

interface ProductTableProps {
  products: ProductType[];
  loading?: boolean;
  error?: boolean;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loading,
}) => {
  return (
    <div className="w-full overflow-x-scroll rounded-md shadow remove-scroll">
      <table className="w-full border border-collapse border-black table-auto">
        <thead className="text-gray-700 bg-blue-50 rounded-t-md">
          <tr>
            <th className="px-6 py-3 border">Product name</th>
            <th className="px-6 py-3 border">Price</th>
            <th className="px-6 py-3 border">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="border-red-100 outline-none">
              <td colSpan={4} className="h-64 bg-white">
                <Spinner size={32} className="mx-auto" />
              </td>
            </tr>
          ) : (
            products.map((product, idx) => (
              <tr key={product.id || idx} className="bg-white">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 border whitespace-nowrap"
                >
                  {product.name}
                </td>
                <td className="px-6 py-4 border">{product.price}</td>
                <td className="px-6 py-4 border">{product.quantity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
