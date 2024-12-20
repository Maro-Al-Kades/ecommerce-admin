import { format } from "date-fns";
import prismaDB from "@/lib/prismaDB";
import BillboardClient from "./components/Client";
import { BillboardColumn } from "./components/columns";

const BillBoardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismaDB.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    imageUrl: item.imageUrl || "", // تأكد من تضمين هذا الحقل
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 space-y-reverse p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillBoardsPage;
