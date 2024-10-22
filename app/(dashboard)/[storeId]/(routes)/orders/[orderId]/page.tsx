import prismaDB from "@/lib/prismaDB";
import BillboardsForm from "./components/BillboardForm";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prismaDB.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <main className="flex-col md:ml-56">
      <section className="flex-1 p-8 pt-6 space-y-4">
        <BillboardsForm initialData={billboard} />
      </section>
    </main>
  );
};

export default BillboardPage;
