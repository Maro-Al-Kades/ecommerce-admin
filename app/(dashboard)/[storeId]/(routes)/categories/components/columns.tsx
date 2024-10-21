"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";
import Image from "next/image";

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  imageUrl: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "الاسم",
  },

  {
    accessorKey: "billboard",
    header: "اللوائح الاعلانية",
    cell: ({ row }) => row.original.billboardLabel,
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
