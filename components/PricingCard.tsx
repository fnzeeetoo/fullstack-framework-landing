"use client";

import { useState } from "react";

interface PricingCardProps {
  title: string;
  price: number;
  features: string[];
  buttonText: string;
  priceId: string;
  highlighted?: boolean;
}

export default function PricingCard({
  title,
  price,
  features,
  buttonText,
  priceId,
  highlighted = false,
}: PricingCardProps) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session. Try again.");
        setLoading(false);
      }
    } catch (e) {
      alert("Error starting checkout.");
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-8 rounded-2xl border ${
        highlighted
          ? "bg-blue-900/30 border-blue-500 shadow-lg"
          : "bg-slate-800/50 border-slate-700"
      } max-w-sm`}
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="text-4xl font-bold mb-6">
        ${price}
        <span className="text-lg font-normal text-slate-400"> one-time</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start">
            <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-slate-300">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={handleBuy}
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold transition ${
          highlighted
            ? "bg-blue-600 hover:bg-blue-500"
            : "bg-slate-700 hover:bg-slate-600"
        } disabled:opacity-50`}
      >
        {loading ? "Redirecting…" : buttonText}
      </button>
    </div>
  );
}
