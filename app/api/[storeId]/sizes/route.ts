import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("UNAUTHANTICATED", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name IS REQUIRED", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value IS REQUIRED", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("STORE_ID IS RQUIRED", { status: 400 });
    }

    const storeByUserId = await prismaDB.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("UNAUTHORIZED", { status: 403 });
    }

    const size = await prismaDB.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(
      { message: "Success", size },
      { status: 201 }
    );
  } catch (error) {
    console.log("[SIZES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("STORE_ID IS RQUIRED", { status: 400 });
    }

    const sizes = await prismaDB.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(
      { message: "Success", sizes },
      { status: 201 }
    );
  } catch (error) {
    console.log("[SIZES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
