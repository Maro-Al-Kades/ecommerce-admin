import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    if (!label) {
      return NextResponse.json(
        { message: "LABEL IS REQUIRED" },
        { status: 400 }
      );
    }
    if (!imageUrl) {
      return NextResponse.json(
        { message: "IMAGE IS REQUIRED" },
        { status: 400 }
      );
    }

    if (!params.billboardId) {
      return NextResponse.json(
        { message: "Billboard ID is Required" },
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

    const billboard = await prismaDB.billboard.updateMany({
      where: {
        id: params.billboardId,
      },

      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(
      { message: "Billboard updated successfully", billboard },
      { status: 200 }
    );
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
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

    if (!params.billboardId) {
      return NextResponse.json(
        { message: "BILLBOARD_ID is Required" },
        { status: 400 }
      );
    }

    const billboard = await prismaDB.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(
      { message: "Billboard Deleted successfully", billboard },
      { status: 200 }
    );
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return NextResponse.json(
        { message: "BILLBOARD_ID is Required" },
        { status: 400 }
      );
    }

    const billboard = await prismaDB.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(
      { message: "SUCCESS", billboard },
      { status: 200 }
    );
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
