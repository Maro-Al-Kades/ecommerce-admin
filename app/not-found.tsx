import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-9xl font-extrabold tracking-widest text-primary">
          404
        </h1>
        <div className="bg-primary px-2 text-sm rounded top-64 rotate-6 absolute text-white">
          الصفحة غير موجودة
        </div>
      </div>
      <p className="text-xl text-muted-foreground max-w-lg text-center">
        نأسف! ربما تمت إزالة الصفحة التي تبحث عنها، أو تم تغيير اسمها، أو أنها
        غير متاحة مؤقتًا.
      </p>

      <Button asChild>
        <Link href="/" className="flex items-center space-x-2">
          <span>العودة للوحة التحكم</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted-foreground/20"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              404 Error
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
