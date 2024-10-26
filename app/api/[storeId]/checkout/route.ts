import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismaDB from "@/lib/prismaDB";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: NextRequest,
  params: { params: { storeId: string } }
) {
  const { productIds } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("No product IDs provided", { status: 400 });
  }

  // Retrieve products
  const products = await prismaDB.product.findMany({
    where: { id: { in: productIds } },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "EGP",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber() * 100,
      },
    });
  });

  // Create the order without the 'store' field
  const order = await prismaDB.order.create({
    data: {
      storeId: params.params.storeId, // Keep this line to associate the store
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: { connect: { id: productId } },
        })),
      },
    },
  });

  // Create a Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}
