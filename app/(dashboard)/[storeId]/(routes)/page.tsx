import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import Overview from "@/components/Overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import prismaDB from "@/lib/prismaDB";
import { formatter } from "@/lib/utils";
import {
  BadgeDollarSign,
  Coins,
  CoinsIcon,
  CreditCard,
  Package,
  PoundSterling,
} from "lucide-react";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="لوحة التحكم"
          description="نظرة عامة علي متجرك الالكتروني"
        />

        <Separator />

        <div className="grid gap-4 grid-cols-3">
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">
                اجمالي الارباح
              </CardTitle>
              <BadgeDollarSign size={25} className="text-primary" />
            </CardHeader>

            <CardContent className="text-primary">
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">المبيعات</CardTitle>
              <CreditCard size={25} className="text-primary" />
            </CardHeader>

            <CardContent className="text-primary">
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">
                عدد المنتجات المتاحة
              </CardTitle>
              <Package size={25} className="text-primary" />
            </CardHeader>

            <CardContent className="text-primary">
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>نظرة عامة</CardTitle>
          </CardHeader>

          <CardContent className="pr-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
