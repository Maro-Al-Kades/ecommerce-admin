"use client";

import { useState } from "react";
import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { BillboardColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alertModal";

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("تم نسخ المعرف بنجاح");
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
      router.refresh();

      toast.success("تم حذف اللوحة بنجاح");
    } catch (error) {
      toast.error("تأكد من حذف جميع الاقسام التي تحت هذه اللوحة الاعلانية.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={`outline`} className="h-8 w-8 p-0">
            <span className="sr-only">النافذة</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center">
          <DropdownMenuLabel className="text-primary">
            الادارة
          </DropdownMenuLabel>
          <DropdownMenuItem
            className="flex items-center justify-between"
            onClick={() => onCopy(data.id)}
          >
            <Copy className="h-4 w-4 ml-2" />
            نسخ المعرف
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center justify-between"
            onClick={() =>
              router.push(`/${params.storeId}/billboards/${data.id}`)
            }
          >
            <Edit className="h-4 w-4 ml-2" />
            تعديل
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center justify-between text-destructive"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4 ml-2" />
            حذف
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
