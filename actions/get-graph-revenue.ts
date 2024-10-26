import prismaDB from "@/lib/prismaDB";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (storeId: string) => {
  const paidOrders = await prismaDB.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },

    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;

    for (const items of order.orderItems) {
      revenueForOrder += items.product.price.toNumber();
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphData: GraphData[] = [
    { name: "يناير", total: 0 },
    { name: "فبراير", total: 0 },
    { name: "مارس", total: 0 },
    { name: "ابريل", total: 0 },
    { name: "مايو", total: 0 },
    { name: "يونيو", total: 0 },
    { name: "يوليو", total: 0 },
    { name: "أغسطس", total: 0 },
    { name: "أكتوبر", total: 0 },
    { name: "سبتمبر", total: 0 },
    { name: "نوفمبر", total: 0 },
    { name: "ديسمبر", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
