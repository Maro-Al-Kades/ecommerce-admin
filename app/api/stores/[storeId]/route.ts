import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    if (!name) {
      return NextResponse.json(
        { message: "Name is Required" },
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return NextResponse.json(
        { message: "Store ID is Required" },
        { status: 400 }
      );
    }

    const store = await prismaDB.store.updateMany({
      where: {
        id: params.storeId,
        userId: userId,
      },

      data: {
        name: name,
      },
    });

    return NextResponse.json(
      { message: "Store updated successfully", store },
      { status: 200 }
    );
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    if (!params.storeId) {
      return NextResponse.json(
        { message: "Store ID is Required" },
        { status: 400 }
      );
    }

    const store = await prismaDB.store.deleteMany({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    return NextResponse.json(
      { message: "Store Deleted successfully", store },
      { status: 200 }
    );
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
