"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { Plus, Ruler } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { APIList } from "@/components/ui/api-list";

interface SizeClientProps {
  data: SizeColumn[];
}

const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between">
        <Heading
          title={`المقاسات / الأحجام (${data.length})`}
          description="ادارة المقاسات / الاحجام لمتجرك الالكتروني"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          اضافة مقاس جديد
          <Ruler className="mr-2 h-4 w-4" />
        </Button>
      </div>

      <Separator style={{ margin: "15px 0" }} />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading title={`API`} description="APIs الخاصة بالمقاسات / الأحجام" />

      <Separator style={{ margin: "15px 0" }} />

      <APIList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};

export default SizeClient;
