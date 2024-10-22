"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, X } from "lucide-react"; // استيراد الأيقونات
import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "اسم المنتج",
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-bold"
      >
        السعر
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "category",
    header: "القسم",
  },
  {
    accessorKey: "size",
    header: "الحجم",
  },
  {
    accessorKey: "color",
    header: "اللون",
    cell: ({ row }) => (
      <div
        className="h-6 w-6 rounded-full border"
        style={{ backgroundColor: row.original.color }}
      />
    ),
  },
  {
    accessorKey: "isArchived",
    header: "غير متوفر",
    cell: ({ row }) => (
      row.original.isArchived ? (
        <Check className="text-primary h-5 w-5" />
      ) : (
        undefined
      )
    ),
  },
  {
    accessorKey: "isFeatured",
    header: "منتج مميز",
    cell: ({ row }) => (
      row.original.isFeatured ? (
        <Check className="text-primary h-5 w-5" />
      ) : (
        undefined
      )
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-bold"
      >
        تاريخ الانشاء
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    header: "ادارة",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
