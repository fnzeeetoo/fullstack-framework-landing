import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    // Record purchase (simple JSON file for MVP, switch to DB in prod)
    const purchase = {
      id: session.id,
      customer_email: session.customer_email,
      product_id: session.display_items?.[0]?.product,
      amount_total: session.amount_total,
      premium: session.display_items?.[0]?.product?.includes("premium"),
      license_key: generateLicenseKey(),
      created_at: new Date().toISOString(),
    };

    // Save to data/purchases.json
    const fs = require("fs");
    const path = "data/purchases.json";
    fs.mkdirSync("data", { recursive: true });
    const purchases = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, "utf8")) : [];
    purchases.push(purchase);
    fs.writeFileSync(path, JSON.stringify(purchases, null, 2));

    // If premium, send onboarding email (placeholder)
    if (purchase.premium) {
      await sendOnboardingEmail(session.customer_email!, purchase.license_key);
    }

    // TODO: Could also deliver Basic download via signed URL stored in purchase record
  }

  return NextResponse.json({ received: true });
}

function generateLicenseKey() {
  // Simple format: FSK-4ALPHA-4ALPHA-4ALPHA
  const rand = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `FSK-${rand()}-${rand()}-${rand()}`;
}

async function sendOnboardingEmail(email: string, licenseKey: string) {
  // Use Resend, Postmark, or nodemailer. Placeholder.
  console.log(`Would send onboarding email to ${email} with license ${licenseKey}`);
}
