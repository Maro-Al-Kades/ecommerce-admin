"use client";

import AlertModal from "@/components/modals/alertModal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/Heading";
import ImageUpload from "@/components/ui/image-upload"; // تأكد من أن المكتبة تعمل كما هو متوقع
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SizesFormProps {
  initialData: Size | null;
}

const formSchema = z.object({
  name: z.string().min(3, "يجب كتابة 3 احرف علي الأقل"),
  value: z.string().nonempty("يجب كتابة عنوان صحيح"),
});

type SizesFormValues = z.infer<typeof formSchema>;

const SizesForm: React.FC<SizesFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "تعديل مقاس / حجم" : "اضافة مقاس / حجم";
  const description = initialData
    ? "تعديل مقاس / حجم"
    : "اضافة مقاس / حجم جديد الي متجرك الالكتروني";
  const toastMessage = initialData
    ? "تم تعديل المقاس / الحجم"
    : "تم انشاء المقاس / الحجم";

  const action = initialData ? "حفظ التغييرات" : "اضافة";

  const form = useForm<SizesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: SizesFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, data);
      }

      router.push(`/${params.storeId}/sizes`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      toast.error("حدث خطأ ما...");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.push(`/${params.storeId}/sizes`);
      router.refresh();

      toast.success("تم حذف المقاس / الحجم");
    } catch (error) {
      toast.error("تأكد من حذف جميع المنتجات التي تحت هذا المقاس / الحجم.");
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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={loading}
            className="opacity-70 hover:opacity-100 transition-all duration-200"
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator style={{ margin: "15px 0" }} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المقاس / الحجم</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="يمكنك اضافة اسم المقاس / الحجم هنا..."
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المقاس / الحجم</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="يمكنك اضافة المقاس / الحجم هنا..."
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={loading}
            className="mr-auto"
            type="submit"
            size={`lg`}
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SizesForm;
