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
import { Billboard } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface BillboardsFormProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(3, "يجب كتابة 3 احرف علي الأقل"),
  imageUrl: z.string().url("يجب كتابة عنوان صحيح"),
});

type BillboardsFormValues = z.infer<typeof formSchema>;

const BillboardsForm: React.FC<BillboardsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "تعديل اللوحة الاعلانية" : "اضافة لوحة اعلانية";
  const description = initialData
    ? "تعديل اللوحة الاعلانية"
    : "اضافة لوحة اعلانية جديدة الي متجرك الالكتروني";
  const toastMessage = initialData
    ? "تم تعديل اللوحة الاعلانية"
    : "تم انشاء اللوحة الاعلانية";

  const action = initialData ? "حفظ التغييرات" : "اضافة";

  const form = useForm<BillboardsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BillboardsFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }

      router.push(`/${params.storeId}/billboards`);
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

      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      router.push(`/${params.storeId}/billboards`);
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>صورة الخلفية</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم اللوحة الاعلانية</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="يمكنك اضافة اسم اللوحة الاعلانية هنا..."
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="mr-auto" type="submit" size={`lg`}>
            {action}
          </Button>
        </form>
      </Form>

    </>
  );
};

export default BillboardsForm;
