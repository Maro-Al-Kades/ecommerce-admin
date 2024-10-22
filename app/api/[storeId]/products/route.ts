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
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("UNAUTHANTICATED", { status: 401 });
    }

    if (!name) {
      return new NextResponse("NAME IS REQUIRED", { status: 400 });
    }

    if (!price) {
      return new NextResponse("PRICE IS REQUIRED", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("CATEGORY_ID IS REQUIRED", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("COLOR_ID IS REQUIRED", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("SIZE_ID IS REQUIRED", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("IAMGES IS REQUIRED", { status: 400 });
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

    const product = await prismaDB.product.create({
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json({ message: "Success", product }, { status: 201 });
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return new NextResponse("STORE_ID IS RQUIRED", { status: 400 });
    }

    const products = await prismaDB.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },

      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ message: "Success", products }, { status: 201 });
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
