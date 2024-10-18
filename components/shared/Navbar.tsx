import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "@/components/MainNav";
import StoreSwitcher from "../StoreSwitcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismaDB from "@/lib/prismaDB";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismaDB.store.findMany({
    where: {
      userId: userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />

        <MainNav className="mx-6" />

        <div className="mr-auto flex items-center space-x-4 space-y-reverse">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;