"use client";

import { useStoreModal } from "@/hooks/useStoreModal";
import { Modal } from "@/components/ui/modal";
import { Button } from "../ui/button";

export const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="أنشئ متجر جديد"
      description="اضف متجر جديد وابدا باضافة الاقسام والمنتجات الان..!"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Button>انشاء المتجر</Button>
    </Modal>
  );
};
