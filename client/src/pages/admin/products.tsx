import { CreateProductButton } from "src/components/CreateProductButton";
import { useForceRender } from "src/hooks/useForceRender";
import { ProductType } from "src/types/ProductType";

const products: ProductType[] = [];

let render: () => void;
const onSave = (product: ProductType) => {
  products.push(product);
  render();
};

const Products = () => {
  render = useForceRender();

  return (
    <div className="grid p-1 pb-6 bg-indigo-300 md:p-4 bg-dark-900 md:grid-cols-2">
      <div className="justify-between m-4 mt-8 md:col-span-2 f">
        <h4>Products</h4>
        <CreateProductButton onSave={onSave} />
      </div>
      {products.map((product) => (
        <pre className="h-screen whitespace-pre-line">
          {JSON.stringify(product)}
        </pre>
      ))}
    </div>
  );
};

export default Products;
