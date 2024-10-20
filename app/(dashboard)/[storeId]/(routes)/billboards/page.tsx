import prismaDB from "@/lib/prismaDB";
import BillboardClient from "./components/BillboardClient";

const BillBoardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismaDB.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 space-y-reverse p-8 pt-6">
        <BillboardClient data={billboards} />
      </div>
    </div>
  );
};

export default BillBoardsPage;
