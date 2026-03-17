import Link from "next/link";
import PricingCard from "@/components/PricingCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold">Forbin&apos;s Framework</div>
          <Link href="/pricing" className="text-slate-300 hover:text-white transition">
            Pricing
          </Link>
        </nav>
      </header>

      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          Turn your OpenClaw into an autonomous COO in 20 minutes
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Production-ready configuration for memory, heartbeat, security, and multi-threading.
          Inspired by Felix. Built for founders and builders who want to delegate.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/pricing"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="px-8 py-3 border border-slate-600 hover:border-slate-400 rounded-lg font-semibold transition"
          >
            Learn More
          </a>
        </div>
      </section>

      <section id="features" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">What&apos;s Included</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: "QMD Memory System",
              desc: "Fast local vector search across your knowledge base, with structured repos for life, notes, and facts.",
            },
            {
              title: "Daily Consolidation",
              desc: "Nightly extraction of important info from chat sessions, automatically updating your notes and reindexing.",
            },
            {
              title: "Enhanced Heartbeat",
              desc: "Proactive monitoring of long-running Codex jobs, auto-restart, and completion notifications.",
            },
            {
              title: "Security Rules",
              desc: "Differentiates authenticated Telegram commands vs informational channels to prevent prompt injection.",
            },
            {
              title: "Telegram Multi-Threading",
              desc: "Use group chats to isolate contexts; each group spawns a separate session.",
            },
            {
              title: "Interactive Setup",
              desc: "CLI wizard guides you through configuration; no manual editing required.",
            },
          ].map((f) => (
            <div key={f.title} className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
        <p className="text-slate-300 mb-8">One-time payment. No subscriptions.</p>
        <div className="flex flex-wrap justify-center gap-6">
          <PricingCard
            title="Basic"
            price={99}
            features={[
              "Full config pack (dist/)",
              "ZIP download",
              "1 license (personal use)",
              "30-day email support",
            ]}
            buttonText="Buy Now"
            priceId="price_basic" // replace with real Stripe price ID
          />
          <PricingCard
            title="Premium"
            price={199}
            features={[
              "Everything in Basic",
              "Hosted setup assistant (web)",
              "Priority support",
              "1 year of updates",
              "Add-ons available",
            ]}
            buttonText="Buy Now"
            priceId="price_premium" // replace with real Stripe price ID
            highlighted
          />
        </div>
        <p className="text-sm text-slate-400 mt-8">
          Prices in USD. Stripe secure checkout. Instant delivery.
        </p>
      </section>

      <footer className="container mx-auto px-4 py-8 text-center text-slate-400 text-sm">
        <p>Built for OpenClaw users. Not affiliated with the OpenClaw project.</p>
      </footer>
    </main>
  );
}
