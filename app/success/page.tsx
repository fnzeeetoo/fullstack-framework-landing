"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "basic" | "premium" | "error">("loading");

  useEffect(() => {
    async function fetchSession() {
      if (!sessionId) {
        setStatus("error");
        return;
      }
      try {
        const res = await fetch(`/api/checkout?session_id=${sessionId}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.premium) {
          setStatus("premium");
        } else {
          setStatus("basic");
        }
      } catch (e) {
        setStatus("error");
      }
    }
    fetchSession();
  }, [sessionId]);

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div>Processing your order...</div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p>We couldn&apos;t verify your purchase. Please contact support.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="max-w-lg mx-auto p-8 bg-slate-800 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Thank you!</h1>
        <p className="text-slate-300 mb-8">
          Your purchase is confirmed. Here&apos;s what&apos;s next:
        </p>

        {status === "basic" ? (
          <div>
            <p className="mb-4">Your download and license key are below.</p>
            <a
              href="/fullstack-framework-dist.zip"
              download
              className="block w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold mb-4 transition"
            >
              Download Full-Stack Framework
            </a>
            <div className="mt-4 p-4 bg-slate-700 rounded text-sm">
              <p className="text-slate-300">License Key:</p>
              <code className="text-green-400 break-all">FSK-XXXX-XXXX-XXXX</code>
              <p className="text-xs text-slate-400 mt-2">Keep this key for activation and support.</p>
            </div>
            <p className="text-sm text-slate-400 mt-6">
              Check your email for the receipt and installation instructions.
            </p>
          </div>
        ) : (
          <div>
            <p className="mb-4">
              You now have access to the <strong>hosted setup assistant</strong>. We&apos;ve sent an invitation email with login details.
            </p>
            <p className="text-slate-300 mb-4">Once logged in, you&apos;ll be guided through configuration.</p>
            <p className="text-sm text-slate-400">
              Need immediate help? Join our Discord (link in email).
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div>Loading…</div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
