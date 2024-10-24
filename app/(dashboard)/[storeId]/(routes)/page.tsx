import prismaDB from "@/lib/prismaDB";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismaDB.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>المتجر النشط االان : {store?.name}</div>;
};

export default DashboardPage;
