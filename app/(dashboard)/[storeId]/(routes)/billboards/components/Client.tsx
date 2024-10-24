"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Construction, Plus, Server } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { APIList } from "@/components/ui/api-list";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between">
        <Heading
          title={`اللوحات الاعلانية (${data.length})`}
          description="ادارة اللوحات الاعلانية لمتجرك الالكتروني"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          اضافة لوحة جديدة
          <Construction className="mr-2 h-4 w-4" />
        </Button>
      </div>

      <Separator style={{ margin: "15px 0" }} />

      <DataTable searchKey="label" columns={columns} data={data} />

      <Heading title={`API`} description="APIs الخاصة باللوحات الاعلانية" />

      <Separator style={{ margin: "15px 0" }} />

      <APIList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};

export default BillboardClient;
