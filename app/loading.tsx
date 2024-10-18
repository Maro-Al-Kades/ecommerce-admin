"use client";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md space-y-8 text-center">
        <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto" />
        <h1 className="text-3xl font-bold tracking-tight">
          جاري التحميل ...
        </h1>

        <Progress value={progress} className="w-full" />
        <p className="text-sm text-muted-foreground">
          {progress === 0
            ? "Starting up..."
            : progress === 66
            ? "Almost there..."
            : "Finishing touches..."}
        </p>
      </div>
      <footer className="absolute bottom-4 text-center text-sm text-muted-foreground">
        <p>&copy; MARO-SYSTEMS. All rights reserved.</p>
      </footer>
    </div>
  );
}
