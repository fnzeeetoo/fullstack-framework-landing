'use client';

import { useEffect, useState } from 'react';

interface Purchase {
  id: string;
  customer_email: string;
  product_id?: string;
  price_id?: string;
  amount_total: number;
  premium: boolean;
  license_key: string;
  created_at: string;
}

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/purchases')
      .then(res => res.json())
      .then(json => {
        setPurchases(json.purchases || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Purchases (debug)</h1>
      {loading ? (
        <p>Loading…</p>
      ) : purchases.length === 0 ? (
        <p>No purchases recorded yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Product</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Premium</th>
                <th className="py-2 px-4">License Key</th>
                <th className="py-2 px-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="py-2 px-4 text-xs">{p.id.substring(0, 12)}…</td>
                  <td className="py-2 px-4">{p.customer_email}</td>
                  <td className="py-2 px-4 text-xs">{p.product_id || '-'}</td>
                  <td className="py-2 px-4">${(p.amount_total / 100).toFixed(2)}</td>
                  <td className="py-2 px-4">{p.premium ? 'Yes' : 'No'}</td>
                  <td className="py-2 px-4">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{p.license_key}</code>
                  </td>
                  <td className="py-2 px-4 text-xs">{new Date(p.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
