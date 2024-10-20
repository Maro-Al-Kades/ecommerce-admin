"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "لوحة التحكم",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "اللوحات الاعلانية",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "الأقسام",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "الاعدادات",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav
      className={cn(
        "flex items-center space-x-4 space-x-reverse lg:space-x-reverse lg:space-x-6",
        className
      )}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-primary font-semibold dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
