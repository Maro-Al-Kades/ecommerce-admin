import BillboardClient from "./components/BillboardClient";

const BillBoardsPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 space-y-reverse p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
};

export default BillBoardsPage;
