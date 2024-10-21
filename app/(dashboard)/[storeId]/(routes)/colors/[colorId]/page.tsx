import prismaDB from "@/lib/prismaDB";
import ColorsForm from "./components/ColorsForm";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  const color = await prismaDB.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <main className="flex-col md:ml-56">
      <section className="flex-1 p-8 pt-6 space-y-4">
        <ColorsForm initialData={color} />
      </section>
    </main>
  );
};

export default ColorPage;
