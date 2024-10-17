"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useStoreModal } from "@/hooks/useStoreModal";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3, "يجب كتابة 3 احرف علي الاقل..."),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/stores", values);
      window.location.assign(`/${response.data.id}`);

    } catch (error) {
      toast.error("حدث خطأ ما...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="أنشئ متجر جديد"
      description="اضف متجر جديد وابدا باضافة الاقسام والمنتجات الان..!"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">الاسم</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="متجر قطع غيار علي سبيل المثال..."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 space-x-reverse flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  onClick={storeModal.onClose}
                  disabled={loading}
                >
                  الغاء
                </Button>
                <Button type="submit" disabled={loading}>
                  متابعة
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
