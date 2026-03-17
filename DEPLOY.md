# Deployment Checklist

Follow this to get the landing page live with Stripe payments.

## 1. Stripe Dashboard Setup

### Create Products & Prices
- [ ] Log into Stripe (use test mode)
- [ ] Create product: "Full-Stack Framework Basic" with one-time price $99
- [ ] Create product: "Full-Stack Framework Premium" with one-time price $199
- [ ] Copy the Price IDs (e.g., `price_1234567890`)

### Get API Keys
- [ ] Find your test publishable key (pk_test_...)
- [ ] Find your test secret key (sk_test_...)
- [ ] Save them for next step

### Webhook Endpoint
- [ ] In Stripe Developers > Webhooks, add endpoint: `https://your-app.vercel.app/api/webhook`
- [ ] Select events: `checkout.session.completed`
- [ ] Copy the webhook signing secret (whsec_...)

## 2. Update Application Code

### Price IDs
- [ ] Edit `app/pricing/page.tsx`
- [ ] Replace `price_basic` with actual Basic Price ID
- [ ] Replace `price_premium` with actual Premium Price ID

### Environment Variables
- [ ] In Vercel project settings, add:
  - `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` = pk_test_...
  - `STRIPE_SECRET_KEY` = sk_test_...
  - `WEBHOOK_SECRET` = whsec_...
- [ ] Also set `NEXT_PUBLIC_APP_URL` to your live domain

## 3. Vercel Deployment

- [ ] Push this repository to GitHub
- [ ] In Vercel, import the repo
- [ ] Configure the environment variables above
- [ ] Deploy to production
- [ ] Confirm deployment URL (e.g., `https://fullstack-framework.vercel.app`)

## 4. Test End-to-End

- [ ] Visit your live site, go to Pricing
- [ ] Click "Buy Now" for Basic
- [ ] Use Stripe test card `4242 4242 4242 4242` with any future expiry and CVC
- [ ] Complete payment
- [ ] You should land on `/success?session_id=...`
- [ ] Check Stripe dashboard: event delivered, webhook recorded
- [ ] Check `data/purchases.json` in your serverless function's filesystem (note: it will disappear on next deploy; for persistence use a DB)

## 5. Switch to Production (when ready)

- [ ] In Stripe, toggle to Live mode
- [ ] Create Live products and prices (or use test ones in live mode? No, create fresh)
- [ ] Get Live API keys and webhook secret
- [ ] Update Vercel environment variables with Live keys
- [ ] Redeploy

## Notes

- The current implementation stores purchases in a local `data/purchases.json` file. This is fine for MVP but will not persist across deploys or scale. Replace with a database (PostgreSQL/Supabase) for production.
- The email sending in webhook is a placeholder. Integrate Resend, Postmark, or AWS SES to actually send onboarding instructions.
- For Basic delivery, implement a signed download URL that checks license key, or email the ZIP as attachment (caution with file size). A simpler approach: store ZIP in Vercel Blob or S3 and serve via `/api/download?key=...`.
