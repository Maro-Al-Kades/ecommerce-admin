import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return NextResponse.json(
        { message: "PRODUCT_ID is Required" },
        { status: 400 }
      );
    }

    const product = await prismaDB.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json({ message: "SUCCESS", product }, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
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
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
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

    if (!params.productId) {
      return NextResponse.json(
        { message: "product ID is Required" },
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

    await prismaDB.product.update({
      where: {
        id: params.productId,
      },

      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },

        isFeatured,
        isArchived,
      },
    });

    const product = await prismaDB.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(
      { message: "product updated successfully", product },
      { status: 200 }
    );
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
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

    if (!params.productId) {
      return NextResponse.json(
        { message: "product_ID is Required" },
        { status: 400 }
      );
    }

    const product = await prismaDB.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(
      { message: "product Deleted successfully", product },
      { status: 200 }
    );
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
