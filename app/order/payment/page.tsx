'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, Upload, ShieldCheck } from 'lucide-react';
import { Loader2 } from 'lucide-react';

function PaymentPageInner() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') ?? 'SmartWhip';
  const town = searchParams.get('town') ?? '';
  const name = searchParams.get('name') ?? '';
  const totalRaw = searchParams.get('total') ?? '0';
  const total = parseFloat(totalRaw);
  const summary = searchParams.get('summary') ?? '';

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [receiptName, setReceiptName] = useState<string | null>(null);

  const copyToClipboard = async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch { /* noop */ }
  };

  const bankDetails = [
    { label: 'Account Name', value: 'SmartWhip UK Ltd' },
    { label: 'Sort Code', value: '20-45-67' },
    { label: 'Account Number', value: '83921047' },
    { label: 'Amount to Pay', value: `£${total.toFixed(2)}` },
    { label: 'Reference', value: name ? `SW-${name.replace(/\s+/g, '').toUpperCase().slice(0, 6)}` : 'SWORDER' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
      <header className="glass border-b sticky top-0 z-50" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link
            href={`/order/checkout?brand=${encodeURIComponent(brand)}&town=${encodeURIComponent(town)}`}
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest"
            style={{ color: 'var(--muted)' }}
          >
            <div className="p-1.5 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
              <ArrowLeft className="h-3 w-3" />
            </div>
            Back
          </Link>
          <span className="text-base font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
            Smart<span style={{ color: 'var(--orange)' }}>Whip</span>
          </span>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-start px-6 pt-10 pb-24">
        <div className="w-full max-w-lg">

          <div className="text-center mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'var(--orange)' }}>
              Final Step
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight mt-2 mb-2" style={{ color: 'var(--foreground)' }}>
              Complete Payment
            </h1>
            <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
              Transfer the exact amount to the account below. Your order ships once confirmed.
            </p>
          </div>

          {/* Order summary strip */}
          {summary && (
            <div
              className="rounded-2xl border px-5 py-3.5 mb-6 text-center"
              style={{ background: 'rgba(255,98,0,0.06)', borderColor: 'rgba(255,98,0,0.25)' }}
            >
              <p className="text-xs font-bold" style={{ color: 'var(--muted)' }}>
                Order: <span className="font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>{summary}</span>
              </p>
            </div>
          )}

          {/* Amount due */}
          <div
            className="rounded-2xl border p-6 mb-6 text-center"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] block mb-1" style={{ color: 'var(--muted-dim)' }}>
              Amount Due
            </span>
            <p className="text-5xl font-black" style={{ color: 'var(--orange)' }}>
              £{total.toFixed(2)}
            </p>
            {name && (
              <p className="text-xs font-bold mt-1" style={{ color: 'var(--muted)' }}>
                For {name} — {town}
              </p>
            )}
          </div>

          {/* Bank details */}
          <div className="rounded-2xl border overflow-hidden mb-6" style={{ borderColor: 'var(--border)' }}>
            <div className="px-5 py-3.5 border-b" style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--orange)' }}>
                Bank Transfer Details
              </span>
            </div>
            {bankDetails.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between px-5 py-4 border-b last:border-0"
                style={{ borderColor: 'var(--border-subtle)', background: 'var(--surface)' }}
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest block" style={{ color: 'var(--muted-dim)' }}>
                    {item.label}
                  </span>
                  <span className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
                    {item.value}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(item.value, item.label)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
                  style={{
                    background: copiedField === item.label ? 'rgba(34,197,94,0.1)' : 'var(--surface-elevated)',
                    color: copiedField === item.label ? 'rgb(34,197,94)' : 'var(--muted)',
                    border: '1px solid',
                    borderColor: copiedField === item.label ? 'rgba(34,197,94,0.3)' : 'var(--border)',
                  }}
                >
                  {copiedField === item.label ? (
                    <><Check className="h-3 w-3" /> Copied</>
                  ) : (
                    <><Copy className="h-3 w-3" /> Copy</>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Upload receipt */}
          <div
            className="rounded-2xl border p-6 mb-6"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] block mb-4" style={{ color: 'var(--orange)' }}>
              Upload Payment Receipt
            </span>

            <label
              className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 cursor-pointer transition-all"
              style={{
                borderColor: receiptName ? 'rgba(34,197,94,0.5)' : 'var(--border)',
                background: receiptName ? 'rgba(34,197,94,0.05)' : 'var(--surface-elevated)',
              }}
            >
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={e => setReceiptName(e.target.files?.[0]?.name ?? null)}
              />
              {receiptName ? (
                <>
                  <Check className="h-8 w-8" style={{ color: 'rgb(34,197,94)' }} />
                  <div className="text-center">
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgb(34,197,94)' }}>
                      Receipt selected
                    </p>
                    <p className="text-[10px] font-medium mt-0.5 truncate max-w-[200px]" style={{ color: 'var(--muted)' }}>
                      {receiptName}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8" style={{ color: 'var(--muted)' }} />
                  <div className="text-center">
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                      Tap to upload
                    </p>
                    <p className="text-[10px] font-medium mt-0.5" style={{ color: 'var(--muted-dim)' }}>
                      Screenshot or PDF of bank transfer
                    </p>
                  </div>
                </>
              )}
            </label>

            <p className="text-[10px] font-medium text-center mt-3" style={{ color: 'var(--muted-dim)' }}>
              Receipt submission coming soon — for now please send to WhatsApp after paying
            </p>
          </div>

          {/* Trust note */}
          <div className="flex items-start gap-3 px-5 py-4 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <ShieldCheck className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--orange)' }} />
            <p className="text-[11px] font-medium leading-relaxed" style={{ color: 'var(--muted)' }}>
              Once your payment is confirmed we will dispatch your order immediately. Typical delivery is <strong style={{ color: 'var(--foreground)' }}>15–20 minutes</strong> from confirmation.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <Loader2 className="h-6 w-6 animate-spin" style={{ color: 'var(--orange)' }} />
      </div>
    }>
      <PaymentPageInner />
    </Suspense>
  );
}
