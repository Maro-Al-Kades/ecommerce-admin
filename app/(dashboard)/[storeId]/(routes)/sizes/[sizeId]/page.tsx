import prismaDB from "@/lib/prismaDB";
import SizesForm from "./components/SizesForm";

const SizePage = async ({
  params,
}: {
  params: { sizeId: string };
}) => {
  const size = await prismaDB.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <main className="flex-col md:ml-56">
      <section className="flex-1 p-8 pt-6 space-y-4">
        <SizesForm initialData={size} />
      </section>
    </main>
  );
};

export default SizePage;
