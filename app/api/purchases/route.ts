import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function GET() {
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      expand: ["data.line_items"],
    });

    const purchases = sessions.data.map(session => {
      const lineItems = session.line_items?.data || [];
      const firstItem = lineItems[0];
      const priceId = firstItem?.price?.id as string | undefined;
      const productId = firstItem?.price?.product as string | undefined;
      const isPremium = productId === "prod_UAcE40A6k8TdVc" || priceId === "price_1TCH56D1XA0S2TWeUVWUZil1";
      return {
        id: session.id,
        customer_email: session.customer_email,
        product_id: productId,
        price_id: priceId,
        amount_total: session.amount_total,
        premium: isPremium,
        license_key: null, // could be stored in session.metadata.license_key if we set it in webhook
        created_at: session.created ? new Date(session.created * 1000).toISOString() : null,
      };
    });

    return NextResponse.json({ purchases });
  } catch (err: any) {
    console.error("Failed to fetch purchases from Stripe:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
