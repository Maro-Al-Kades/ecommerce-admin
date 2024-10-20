"use client";

import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge, BadgeProps } from "./ui/badge";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "متاح للجميع",
  admin: "متاح للادمن فقط",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "default",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("تم نسخ مسار  ال API بنجاح");
  };
  return (
    <Alert className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-end gap-2">
        <AlertTitle className="flex items-center gap-x-2">
          <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
          <span className="font-bold">{title}</span>
        </AlertTitle>
        <Server className="h-4 w-4" />
      </div>

      <div className="flex flex-row items-center justify-end w-full">
        <AlertDescription className="flex flex-col-reverse gap-4 text-left lg:gap-0 lg:flex-row items-center justify-between w-full">
          <Button
            variant="outline"
            color="primary"
            size="icon"
            onClick={onCopy}
          >
            <Copy className="h-4 w-4" />
          </Button>

          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-bold">
            {description}
          </code>
        </AlertDescription>
      </div>
    </Alert>
  );
};
