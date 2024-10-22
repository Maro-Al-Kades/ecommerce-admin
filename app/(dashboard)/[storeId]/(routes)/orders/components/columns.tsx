"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "المنتجات",
  },
  {
    accessorKey: "phone",
    header: "رقم الهاتف",
  },
  {
    accessorKey: "address",
    header: "العنوان",
  },
  {
    accessorKey: "totalPrice",
    header: "اجمالي السعر",
  },
  {
    accessorKey: "isPaid",
    header: "تم الدفع",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-bold"
      >
        تاريخ الدفع
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
];
