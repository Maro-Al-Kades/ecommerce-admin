import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return NextResponse.json(
        { message: "COLOR_ID is Required" },
        { status: 400 }
      );
    }

    const color = await prismaDB.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json({ message: "SUCCESS", color }, { status: 200 });
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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

    if (!params.colorId) {
      return NextResponse.json(
        { message: "COLOR ID is Required" },
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

    const color = await prismaDB.color.updateMany({
      where: {
        id: params.colorId,
      },

      data: {
        name,
        value,
      },
    });

    return NextResponse.json(
      { message: "color updated successfully", color },
      { status: 200 }
    );
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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

    if (!params.colorId) {
      return NextResponse.json(
        { message: "COLOR_ID is Required" },
        { status: 400 }
      );
    }

    const color = await prismaDB.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(
      { message: "COLOR Deleted successfully", color },
      { status: 200 }
    );
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
