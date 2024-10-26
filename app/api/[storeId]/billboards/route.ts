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
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("UNAUTHANTICATED", { status: 401 });
    }

    if (!label) {
      return new NextResponse("LABEL IS REQUIRED", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("BILLBOARD IS REQUIRED", { status: 400 });
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

    const billboard = await prismaDB.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });



    return NextResponse.json(
      { message: "Success", billboard },
      { status: 201 }
    );
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
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

    const billboards = await prismaDB.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(
      { message: "Success", billboards },
      { status: 201 }
    );
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
