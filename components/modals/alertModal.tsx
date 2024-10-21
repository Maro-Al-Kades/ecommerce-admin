"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}
const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="هل انت متأكد انك تريد الحذف ؟"
      description="بمجرد التأكيد لا يمكنك التراجع عن هذه العملية."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 space-x-reverse flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          الغاء
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          متابعة
          <Trash />
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
