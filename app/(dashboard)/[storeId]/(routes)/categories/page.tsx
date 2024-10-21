import { format } from "date-fns";
import prismaDB from "@/lib/prismaDB";
import { CategoryColumn } from "./components/columns";
import CategoryClient from "./components/Client";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismaDB.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    imageUrl: item.billboard.imageUrl || "", // تعيين `imageUrl` بقيمة افتراضية إذا لم يكن موجودًا
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 space-y-reverse p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
