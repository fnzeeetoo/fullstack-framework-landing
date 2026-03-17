# Full-Stack Framework Landing Page

Next.js 14 marketing site with Stripe Checkout integration for selling the Full-Stack Framework product.

## Features

- Marketing homepage with value proposition and features
- Pricing page with two tiers (Basic $99, Premium $199)
- Stripe Checkout integration
- Post-purchase success flow (download for Basic, onboarding email for Premium)
- Webhook handler to record purchases and issue license keys
- Simple JSON-file persistence (MVP)

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Stripe keys

# Run development server
npm run dev
# Open http://localhost:3000
```

## Stripe Setup

1. Create two products in Stripe dashboard:
   - Full-Stack Framework Basic ($99 one-time)
   - Full-Stack Framework Premium ($199 one-time)
2. Get the Price IDs and edit `app/pricing/page.tsx` to replace `price_basic` and `price_premium` with actual IDs.
3. Add the following environment variables:
   - `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` (pk_test_...)
   - `STRIPE_SECRET_KEY` (sk_test_...)
   - `WEBHOOK_SECRET` (from Stripe webhook endpoint)
4. Deploy and configure Stripe webhook to point to `/api/webhook` (use CLI or Vercel integration).

## Deployment to Vercel

1. Push this repository to GitHub.
2. In Vercel, import the repository.
3. Set environment variables in Vercel project settings (same as above).
4. Deploy.

The production success page URLs will be:
- `https://your-app.vercel.app/success?session_id=...`

## Product Delivery

- **Basic**: After webhook, we store a license key and could generate a signed download URL. For now, you can manually upload `dist.zip` to Vercel and link it from success page or serve via API route.
- **Premium**: Webhook triggers an onboarding email (placeholder in code). You&apos;ll need to add your email provider (Resend/Postmark) to `app/api/webhook/route.ts`.

## File Structure

```
app/
  layout.tsx
  page.tsx           # Homepage
  pricing/page.tsx   # Pricing page
  success/page.tsx   # Stripe redirect
  api/
    checkout/route.ts   # Creates checkout session
    webhook/route.ts    # Handles Stripe events
components/
  PricingCard.tsx
```

## Customization

- Update branding, colors, copy in respective files.
- For more sophisticated delivery (expiring download links), add a `/api/download` route that checks license key and streams ZIP.

## License

MIT
