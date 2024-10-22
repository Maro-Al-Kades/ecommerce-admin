"use client";

import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface OrderClienttProps {
  data: OrderColumn[];
}

const OrderClientt: React.FC<OrderClienttProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`الطلبــــات (${data.length})`}
        description="ادارة الطلبـــات لمتجرك الالكتروني"
      />

      <Separator style={{ margin: "15px 0" }} />

      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};

export default OrderClientt;
