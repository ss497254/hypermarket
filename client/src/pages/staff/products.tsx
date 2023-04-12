import { useCallback, useEffect } from "react";
import { AddProductButton } from "src/components/AddProductButton";
import StaffLayout from "src/components/layouts/StaffLayout";
import { useGet } from "src/hooks/ApiHooks";
import { useForceRender } from "src/hooks/useForceRender";
import { NextPageWithLayout } from "src/types/NextPageWithLayout";
import { ProductType } from "src/types/ProductType";
import { ProductTable } from "src/ui/ProductTable";

let products: ProductType[] = [];

const Products: NextPageWithLayout = () => {
  const render = useForceRender();

  const { run, loading, error } = useGet<{ data: ProductType[] }>(
    "/api/products",
  );

  const onSave = useCallback((data: ProductType) => {
    products.push(data);
    render();
  }, []);

  useEffect(() => {
    run().then((res) => res && (products = res.data));
  }, []);

  return (
    <div className="max-w-5xl m-4 md:m-8">
      <div className="justify-between mt-8 mb-4 md:col-span-2 f">
        <h4>Products</h4>
        <AddProductButton onSave={onSave} />
      </div>
      <ProductTable products={products} error={error} loading={loading} />
    </div>
  );
};

Products.getLayout = (page: React.ReactNode) => (
  <StaffLayout>{page}</StaffLayout>
);

export default Products;
