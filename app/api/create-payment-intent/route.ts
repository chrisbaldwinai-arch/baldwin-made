import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { amount, invoiceNumber } = await req.json();

    if (typeof amount !== "number" || amount < 1) {
      return NextResponse.json(
        { error: "Amount must be at least $1.00" },
        { status: 400 }
      );
    }

    const invoiceRef =
      typeof invoiceNumber === "string" && invoiceNumber.trim()
        ? invoiceNumber.trim()
        : null;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert dollars to cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      ...(invoiceRef && {
        description: `Invoice ${invoiceRef}`,
        metadata: { invoice_number: invoiceRef },
      }),
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("PaymentIntent error:", err);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
