"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

const BillboardClient = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between">
        <Heading
          title="اللوحات الاعلانية (0)"
          description="ادارة اللوحات الاعلانية لمتجرك الالكتروني"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          اضافة لوحة
          <Plus className="mr-2 h-4 w-4" />
        </Button>
      </div>

      <Separator style={{ margin: "15px 0" }} />
    </>
  );
};

export default BillboardClient;
