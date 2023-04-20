import React, { memo } from "react";
import Spinner from "src/icons/Loading";
import { ProductType } from "src/types/ProductType";

interface ProductTableProps {
  products: ProductType[];
  loading?: boolean;
  error?: boolean;
}

const ProductRow = memo(({ name, price, id, quantity }: ProductType) => (
  <tr className="bg-white">
    <td className="px-6 py-4 text-center border">{id}</td>
    <td scope="row" className="px-6 py-4 border">
      {name}
    </td>
    <td className="px-6 py-4 border">{price}</td>
    <td className="px-6 py-4 border">{quantity}</td>
  </tr>
));

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loading,
}) => {
  const noRecords = products.length === 0;

  return (
    <div className="w-full overflow-x-scroll rounded-md shadow remove-scroll">
      <table className="w-full border border-collapse border-black table-auto">
        <thead className="text-gray-700 bg-blue-50 rounded-t-md">
          <tr>
            <th className="px-6 w-[5%] py-3 border">ID</th>
            <th className="px-6 py-3 border">Product name</th>
            <th className="px-6 py-3 border">Price</th>
            <th className="px-6 py-3 border">Quantity</th>
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
                <h4>No products found.</h4>
              </td>
            </tr>
          ) : (
            products.map((product) => <ProductRow {...product} />)
          )}
        </tbody>
      </table>
    </div>
  );
};
