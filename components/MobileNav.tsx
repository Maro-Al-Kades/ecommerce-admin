"use client";

import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  const routes = [
    { href: `/${params.storeId}`, label: "لوحة التحكم" },
    { href: `/${params.storeId}/billboards`, label: "اللوحات الاعلانية" },
    { href: `/${params.storeId}/categories`, label: "الأقسام" },
    { href: `/${params.storeId}/sizes`, label: "المقاسات / الاحجام" },
    { href: `/${params.storeId}/colors`, label: "الألــوان" },
    { href: `/${params.storeId}/products`, label: "المنتجات" },
    { href: `/${params.storeId}/orders`, label: "الطلبــات" },
    { href: `/${params.storeId}/settings`, label: "الاعدادات" },
  ];

  return (
    <div className="lg:hidden z-50">
      <Button size="icon" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <X /> : <Menu />}
      </Button>

      <div
        className={`fixed p-34 top-16 left-0 w-full backdrop-blur-3xl border-primary shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {isOpen && (
          <nav className="flex flex-col p-10">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="block text-primary p-4 text-md font-medium transition-colors border-b w-full text-center hover:bg-muted/30"
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
