import Link from "next/link";
import PricingCard from "@/components/PricingCard";

export default function Pricing() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Forbin&apos;s Framework</Link>
          <Link href="/" className="text-slate-300 hover:text-white transition">Home</Link>
        </nav>
      </header>

      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Pricing</h1>
        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
          One-time payment. No hidden fees. You get immediate access to the configuration pack and documentation.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          <PricingCard
            title="Basic"
            price={99}
            features={[
              "Complete dist/ directory (scripts, templates, docs)",
              "ZIP instant download",
              "1 personal license",
              "Email support (30 days)",
              "All future minor updates",
            ]}
            buttonText="Buy Now"
            priceId="price_basic"
          />
          <PricingCard
            title="Premium"
            price={199}
            features={[
              "Everything in Basic",
              "Hosted setup assistant (web)",
              "Priority support (48h response)",
              "1 year of major updates",
              "Community access (Discord)",
            ]}
            buttonText="Buy Now"
            priceId="price_premium"
            highlighted
          />
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-left space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
            <div className="space-y-4 text-slate-300">
              <div>
                <strong>What&apos;s the difference between Basic and Premium?</strong>
                <p className="mt-1">Basic gives you the files to run yourself. Premium includes a hosted setup assistant (no terminal needed) and priority support.</p>
              </div>
              <div>
                <strong>Do I need developer experience?</strong>
                <p className="mt-1">Basic requires comfort with command line and cron. Premium removes that barrier with the web assistant.</p>
              </div>
              <div>
                <strong>Is this a subscription?</strong>
                <p className="mt-1">No. One-time payment. Optional add-ons (trading module, setup call) are extra.</p>
              </div>
              <div>
                <strong>What if I need help?</strong>
                <p className="mt-1">Basic: email support within 30 days. Premium: priority support and community access.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="container mx-auto px-4 py-8 text-center text-slate-400 text-sm">
        <p>Questions? Contact us at <a href="mailto:support@forbin.ai" className="text-blue-400 hover:underline">support@forbin.ai</a></p>
      </footer>
    </main>
  );
}
