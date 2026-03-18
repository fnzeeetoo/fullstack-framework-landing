import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const stripeSecret = process.env.WEBHOOK_SECRET;
  if (!stripeSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const body = await request.text();
  const signature = headers().get("stripe-signature")!;

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
  });

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, stripeSecret);
  } catch (err: any) {
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  const session = event.data.object as any;

  if (event.type === "checkout.session.completed") {
    // Extract product info from line_items
    const lineItems = (session as any).line_items?.data || [];
    const firstItem = lineItems[0];
    const priceId = firstItem?.price?.id as string | undefined;
    const productId = firstItem?.price?.product as string | undefined;

    // Determine premium by comparing to our known product IDs
    const isPremium = productId === "prod_UAcE40A6k8TdVc" || priceId === "price_1TCH56D1XA0S2TWeUVWUZil1";

    const purchase = {
      id: session.id,
      customer_email: session.customer_email,
      product_id: productId,
      price_id: priceId,
      amount_total: session.amount_total,
      premium: isPremium,
      license_key: generateLicenseKey(),
      created_at: new Date().toISOString(),
    };

    // Save to data/purchases.json
    const fs = await import("fs");
    const path = "data/purchases.json";
    fs.mkdirSync("data", { recursive: true });
    const purchases = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, "utf8")) : [];
    purchases.push(purchase);
    fs.writeFileSync(path, JSON.stringify(purchases, null, 2));

    // If premium, send onboarding email (placeholder)
    if (purchase.premium) {
      await sendOnboardingEmail(session.customer_email!, purchase.license_key);
    }
  }

  return NextResponse.json({ received: true });
}

function generateLicenseKey() {
  const rand = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `FSK-${rand()}-${rand()}-${rand()}`;
}

async function sendOnboardingEmail(email: string, licenseKey: string) {
  // Use Resend, Postmark, or nodemailer. Placeholder.
  console.log(`Would send onboarding email to ${email} with license ${licenseKey}`);
}
