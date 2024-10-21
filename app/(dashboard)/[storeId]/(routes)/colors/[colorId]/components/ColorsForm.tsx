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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface ColorsFormProps {
  initialData: Color | null;
}

const formSchema = z.object({
  name: z.string().min(3, "يجب كتابة 3 احرف علي الأقل"),
  value: z
    .string()
    .min(4)
    .nonempty("يجب كتابة عنوان صحيح")
    .regex(/^#/, { message: "يجب كتابة كود اللون بشكل صحيح !" }),
});

type ColorsFormValues = z.infer<typeof formSchema>;

const ColorsForm: React.FC<ColorsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "تعديل اللـــون" : "اضافة لون جديد";
  const description = initialData
    ? "تعديل اللـــون"
    : "اضافة لـــون الي متجرك الالكتروني";
  const toastMessage = initialData ? "تم تعديل اللـــون" : "تم انشاء اللـــون";

  const action = initialData ? "حفظ التغييرات" : "اضافة";

  const form = useForm<ColorsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: ColorsFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }

      router.push(`/${params.storeId}/colors`);
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

      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.push(`/${params.storeId}/colors`);
      router.refresh();

      toast.success("تم حذف اللـــون");
    } catch (error) {
      toast.error("تأكد من حذف جميع المنتجات التي تحت هذا اللـــون");
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
                  <FormLabel>اسم اللـــون</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="يمكنك اضافة اسم اللــون..."
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
                  <FormLabel> كود اللـــون</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        placeholder="يمكنك اضافة كود اللون هنا تأكد من كتابة # قبل كود اللون.."
                        disabled={loading}
                        {...field}
                      />

                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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

export default ColorsForm;
