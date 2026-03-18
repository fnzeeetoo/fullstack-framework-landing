import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("Checkout handler start");
  try {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecret) {
      console.error("STRIPE_SECRET_KEY missing");
      return NextResponse.json({ error: "Stripe secret key not configured" }, { status: 500 });
    }

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeSecret, { apiVersion: "2024-06-20" });

    const { priceId, successUrl, cancelUrl } = await request.json();

    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    console.error("Checkout error:", err);
    return NextResponse.json({ 
      error: err.message || "Unknown error", 
      details: typeof err === 'object' ? (err.stack || err) : undefined
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecret) {
      return NextResponse.json({ error: "Stripe secret key not configured" }, { status: 500 });
    }

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeSecret, { apiVersion: "2024-06-20" });

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    const lineItems = (session as any).line_items?.data || [];
    const firstItem = lineItems[0];
    const priceId = firstItem?.price?.id as string | undefined;
    const productId = firstItem?.price?.product as string | undefined;
    const isPremium = productId === "prod_UAcE40A6k8TdVc" || priceId === "price_1TCH56D1XA0S2TWeUVWUZil1";
    return NextResponse.json({ premium: isPremium });
  } catch (err: any) {
    console.error("GET /api/checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
