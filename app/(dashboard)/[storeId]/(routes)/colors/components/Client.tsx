"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { Palette } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { ColorColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { APIList } from "@/components/ui/api-list";

interface ColorClientProps {
  data: ColorColumn[];
}

const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between">
        <Heading
          title={`الألـــوان (${data.length})`}
          description="ادارة الألــوان لمتجرك الالكتروني"
        />

        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          اضافة لون جديد
          <Palette className="mr-2 h-4 w-4" />
        </Button>
      </div>

      <Separator style={{ margin: "15px 0" }} />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading title={`API`} description="APIs الخاصة بالألـــوان" />

      <Separator style={{ margin: "15px 0" }} />

      <APIList entityName="colors" entityIdName="colorId" />
    </>
  );
};

export default ColorClient;
