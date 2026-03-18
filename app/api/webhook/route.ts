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
    // For MVP we don't persist to local files; fetch purchases via Stripe API instead.
    // Optionally, you could send an email or store license key in Stripe session metadata.
    console.log(`Checkout completed: ${session.id}`);
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
