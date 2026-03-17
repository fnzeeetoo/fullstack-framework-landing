# Landing Page — Product Spec

## Overview
Marketing site for the Full-Stack Framework product. Hosted on Vercel, integrated with Stripe Checkout.

## Pages

### 1. Homepage (`/`)
- Hero section: "Turn your OpenClaw into an autonomous COO in 20 minutes"
- Subhead: "Production-ready memory, heartbeat, security, and multi-threading — all configured for you"
- Features grid (5-6 bullets with icons)
- Social proof placeholder ("As seen on X" / testimonial)
- Pricing cards (Basic $99, Premium $199)
- CTA buttons: "Get Started" (scroll to pricing)

### 2. Pricing (`/pricing`)
- Detailed comparison table
- FAQ: "What's the difference?", "Do I need developer experience?", "What if I need help?"
- primary CTA: "Buy Now" (Stripe Checkout)

### 3. Success (`/success?session_id={CHECKOUT_SESSION_ID}`)
- After Stripe Checkout redirect
- Basic: Show download link (ZIP) and license key
- Premium: "Check your email for onboarding instructions" + show order number

### 4. Webhook Endpoint (`/api/webhook`)
- Stripe webhook handler
- On `checkout.session.completed`:
  - Mark purchase as complete in DB
  - Generate license key if needed
  - For Basic: create signed download URL (temporary)
  - For Premium: send onboarding email (via Resend/Postmark)
  - Return 200

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS (already in Vercel template)
- Stripe Checkout (client-side via `stripe.redirectToCheckout`)
- Backend API routes for webhook and license generation
- PostgreSQL (optional for MVP, could use KV store)
- Vercel deployment

## Environment Variables
- `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`
- `STRIPE_SECRET_KEY`
- `WEBHOOK_SECRET`
- `DATABASE_URL` (optional, can use JSON file for MVP)

## Copy & Pricing
- Basic ($99):
  - ZIP download with full dist/
  - 1 license for personal use
  - 30-day support via email
- Premium ($199):
  - Access to hosted interactive setup assistant (web)
  - Priority support
  - Include future updates for 1 year
  - Optional add-ons: Trading Bot Module (+$199), Setup Call (+$299)

## Stripe Products
- Create two products in Stripe dashboard:
  - "Full-Stack Framework Basic" ($99)
  - "Full-Stack Framework Premium" ($199)
- Use product IDs in code

## Design Notes
- Clean, professional, minimal. Dark mode optional.
- Use OpenClaw/tech imagery sparingly.
- Focus on clarity and conversion.

## Deliverables
- Full Next.js app in `/app`, `/components`, `/lib`
- `.env.example` file
- `vercel.json` if needed
- README with deployment steps
- `DEPLOY.md` with Stripe setup checklist
