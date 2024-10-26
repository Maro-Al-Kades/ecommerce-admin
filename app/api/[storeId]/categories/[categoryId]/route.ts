import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    if (!name) {
      return NextResponse.json(
        { message: "name IS REQUIRED" },
        { status: 400 }
      );
    }
    if (!billboardId) {
      return NextResponse.json(
        { message: "Billboard IS REQUIRED" },
        { status: 400 }
      );
    }

    if (!params.categoryId) {
      return NextResponse.json(
        { message: "Category ID is Required" },
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

    const category = await prismaDB.category.updateMany({
      where: {
        id: params.categoryId,
      },

      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(
      { message: "Category updated successfully", category },
      { status: 200 }
    );
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
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

    if (!params.categoryId) {
      return NextResponse.json(
        { message: "CATEGORY_ID is Required" },
        { status: 400 }
      );
    }

    const category = await prismaDB.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(
      { message: "category Deleted successfully", category },
      { status: 200 }
    );
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return NextResponse.json(
        { message: "CATEGORY_ID is Required" },
        { status: 400 }
      );
    }

    const category = await prismaDB.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        products: true,
        billboard: true
      },
    });

    return NextResponse.json({ message: "SUCCESS", category }, { status: 200 });
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
