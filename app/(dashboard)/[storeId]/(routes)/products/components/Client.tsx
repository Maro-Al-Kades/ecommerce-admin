"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { APIList } from "@/components/ui/api-list";

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between">
        <Heading
          title={`المنتجـــات (${data.length})`}
          description="ادارة المنتجـــات لمتجرك الالكتروني"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          اضافة منتج جديد
          <ShoppingCart className="mr-2 h-4 w-4" />
        </Button>
      </div>

      <Separator style={{ margin: "15px 0" }} />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading title={`API`} description="APIs الخاصة بالمنتجـــات" />

      <Separator style={{ margin: "15px 0" }} />

      <APIList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ProductClient;
