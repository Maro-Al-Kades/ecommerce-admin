import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, logo } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Missing required field: name", { status: 400 });
    }

    const store = await prismaDB.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json({ message: "Success", store }, { status: 201 });
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
