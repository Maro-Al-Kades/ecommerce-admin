import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return NextResponse.json(
        { message: "SIZE_ID is Required" },
        { status: 400 }
      );
    }

    const size = await prismaDB.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json({ message: "SUCCESS", size }, { status: 200 });
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    if (!name) {
      return NextResponse.json(
        { message: "name IS REQUIRED" },
        { status: 400 }
      );
    }
    if (!value) {
      return NextResponse.json(
        { message: "value IS REQUIRED" },
        { status: 400 }
      );
    }

    if (!params.sizeId) {
      return NextResponse.json(
        { message: "SIZE ID is Required" },
        { status: 400 }
      );
    }

    const storeByUserID = await prismaDB.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUserID) {
      return new NextResponse("UNAUTHORIZED", { status: 403 });
    }

    const size = await prismaDB.size.updateMany({
      where: {
        id: params.sizeId,
      },

      data: {
        name,
        value,
      },
    });

    return NextResponse.json(
      { message: "size updated successfully", size },
      { status: 200 }
    );
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const storeByUserID = await prismaDB.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserID) {
      return new NextResponse("UNAUTHORIZED", { status: 403 });
    }

    if (!params.sizeId) {
      return NextResponse.json(
        { message: "SIZE_ID is Required" },
        { status: 400 }
      );
    }

    const size = await prismaDB.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(
      { message: "size Deleted successfully", size },
      { status: 200 }
    );
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
