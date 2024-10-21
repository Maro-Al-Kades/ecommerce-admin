"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { APIList } from "@/components/ui/api-list";

interface CategoryClientProps {
  data: CategoryColumn[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between">
        <Heading
          title={`الأقســـام (${data.length})`}
          description="ادارة الاقسام لمتجرك الالكتروني"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          اضافة قسم جديد
          <Plus className="mr-2 h-4 w-4" />
        </Button>
      </div>
 
      <Separator style={{ margin: "15px 0" }} />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading title={`API`} description="APIs الخاصة بالاقسام" />

      <Separator style={{ margin: "15px 0" }} />

      <APIList entityName="categories" entityIdName="categoryId" />
    </>
  );
};

export default CategoryClient;
