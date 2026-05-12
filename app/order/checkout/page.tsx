'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Loader2, ChevronRight, Minus, Plus, Clock, X, Package } from 'lucide-react';

const DeliveryMap = dynamic(() => import('@/components/DeliveryMap'), { ssr: false });

const PRICE_SINGLE = 30;
const PRICE_BOX = 130;
const BOX_SIZE = 6;

function calcTotal(singles: number, boxes: number): number {
  return singles * PRICE_SINGLE + boxes * PRICE_BOX;
}

function buildSummary(singles: number, boxes: number): string {
  const parts: string[] = [];
  if (boxes > 0) parts.push(`${boxes} box${boxes > 1 ? 'es' : ''} of 6`);
  if (singles > 0) parts.push(`${singles} single${singles > 1 ? 's' : ''}`);
  return parts.join(' + ') || '0 items';
}

function CheckoutInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const brand = searchParams.get('brand') ?? 'SmartWhip';
  const town = searchParams.get('town') ?? '';
  const admin = searchParams.get('admin') ?? '';

  const [singles, setSingles] = useState(1);
  const [boxes, setBoxes] = useState(0);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const total = calcTotal(singles, boxes);
  const totalItems = singles + boxes * BOX_SIZE;

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Required';
    if (!phone.trim()) e.phone = 'Required';
    if (!email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email';
    if (!address.trim()) e.address = 'Required';
    if (totalItems === 0) e.qty = 'Please select at least one item';
    return e;
  }

  function handleContinue() {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      const firstKey = Object.keys(e)[0];
      document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setErrors({});
    setSheetOpen(true);
  }

  function handleCompleteOrder() {
    const params = new URLSearchParams({
      brand,
      town,
      name,
      total: total.toFixed(2),
      summary: buildSummary(singles, boxes),
    });
    router.push(`/order/payment?${params.toString()}`);
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        setSheetOpen(false);
      }
    };
    if (sheetOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [sheetOpen]);

  useEffect(() => {
    if (sheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sheetOpen]);

  const inputClass = 'w-full h-14 px-4 rounded-2xl border text-sm font-semibold outline-none transition-all';
  const inputStyle = (hasError: boolean) => ({
    background: 'var(--surface)',
    borderColor: hasError ? 'rgb(239,68,68)' : 'var(--border)',
    color: 'var(--foreground)',
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
      <header className="glass border-b sticky top-0 z-50" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link
            href={`/order?brand=${encodeURIComponent(brand)}`}
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

      <main className="flex-grow flex flex-col items-center px-6 pt-10 pb-28">
        <div className="w-full max-w-lg space-y-8">

          {/* Step indicator */}
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'var(--orange)' }}>
              Checkout
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight mt-2" style={{ color: 'var(--foreground)' }}>
              Your Order
            </h1>
            {town && (
              <p className="text-sm font-medium mt-1" style={{ color: 'var(--muted)' }}>
                Delivering to <strong style={{ color: 'var(--foreground)' }}>{town}</strong>
                {admin ? `, ${admin}` : ''}
              </p>
            )}
          </div>

          {/* — QUANTITY SELECTOR — */}
          <section>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] block mb-3" style={{ color: 'var(--muted-dim)' }}>
              How Many Do You Need?
            </span>

            {errors.qty && (
              <p className="text-[11px] font-bold text-red-500 mb-2 uppercase tracking-widest">{errors.qty}</p>
            )}

            <div className="space-y-3" id="field-qty">
              {/* Singles */}
              <div
                className="flex items-center justify-between px-5 py-4 rounded-2xl border"
                style={{ background: 'var(--surface)', borderColor: singles > 0 ? 'var(--orange)' : 'var(--border)' }}
              >
                <div>
                  <p className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
                    Single Cylinder
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-widest mt-0.5" style={{ color: 'var(--muted)' }}>
                    £{PRICE_SINGLE} each · {brand} 640g
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSingles(s => Math.max(0, s - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center border transition-all active:scale-95"
                    style={{ borderColor: 'var(--border)', background: 'var(--surface-elevated)' }}
                  >
                    <Minus className="h-3 w-3" style={{ color: 'var(--foreground)' }} />
                  </button>
                  <span className="text-lg font-black w-6 text-center" style={{ color: 'var(--foreground)' }}>{singles}</span>
                  <button
                    onClick={() => setSingles(s => s + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center border transition-all active:scale-95"
                    style={{ borderColor: 'var(--orange)', background: 'rgba(255,98,0,0.1)' }}
                  >
                    <Plus className="h-3 w-3" style={{ color: 'var(--orange)' }} />
                  </button>
                </div>
              </div>

              {/* Box of 6 */}
              <div
                className="flex items-center justify-between px-5 py-4 rounded-2xl border"
                style={{ background: 'var(--surface)', borderColor: boxes > 0 ? 'var(--orange)' : 'var(--border)' }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
                      Box of 6
                    </p>
                    <span
                      className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded"
                      style={{ background: 'rgba(34,197,94,0.1)', color: 'rgb(34,197,94)' }}
                    >
                      Save £{(6 * PRICE_SINGLE - PRICE_BOX).toFixed(0)}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-widest mt-0.5" style={{ color: 'var(--muted)' }}>
                    £{PRICE_BOX} per box · {brand} 640g
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBoxes(b => Math.max(0, b - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center border transition-all active:scale-95"
                    style={{ borderColor: 'var(--border)', background: 'var(--surface-elevated)' }}
                  >
                    <Minus className="h-3 w-3" style={{ color: 'var(--foreground)' }} />
                  </button>
                  <span className="text-lg font-black w-6 text-center" style={{ color: 'var(--foreground)' }}>{boxes}</span>
                  <button
                    onClick={() => setBoxes(b => b + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center border transition-all active:scale-95"
                    style={{ borderColor: 'var(--orange)', background: 'rgba(255,98,0,0.1)' }}
                  >
                    <Plus className="h-3 w-3" style={{ color: 'var(--orange)' }} />
                  </button>
                </div>
              </div>
            </div>

            {/* Total */}
            {totalItems > 0 && (
              <div
                className="mt-3 flex items-center justify-between px-5 py-3.5 rounded-2xl border"
                style={{ background: 'rgba(255,98,0,0.06)', borderColor: 'rgba(255,98,0,0.25)' }}
              >
                <div className="flex items-center gap-2">
                  <Package className="h-3.5 w-3.5" style={{ color: 'var(--orange)' }} />
                  <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                    {totalItems} cylinder{totalItems !== 1 ? 's' : ''} · {buildSummary(singles, boxes)}
                  </span>
                </div>
                <span className="text-xl font-black" style={{ color: 'var(--orange)' }}>
                  £{total.toFixed(2)}
                </span>
              </div>
            )}
          </section>

          {/* — DELIVERY INFO — */}
          <section>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] block mb-3" style={{ color: 'var(--muted-dim)' }}>
              Delivery Information
            </span>

            <div className="space-y-3">
              {/* Name */}
              <div id="field-name">
                <label className="text-[10px] font-black uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted-dim)' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={e => { setName(e.target.value); setErrors(er => ({ ...er, name: '' })); }}
                  className={inputClass}
                  style={inputStyle(!!errors.name)}
                />
                {errors.name && <p className="text-[11px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div id="field-phone">
                <label className="text-[10px] font-black uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted-dim)' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+44 7700 000000"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setErrors(er => ({ ...er, phone: '' })); }}
                  className={inputClass}
                  style={inputStyle(!!errors.phone)}
                />
                {errors.phone && <p className="text-[11px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div id="field-email">
                <label className="text-[10px] font-black uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted-dim)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: '' })); }}
                  className={inputClass}
                  style={inputStyle(!!errors.email)}
                />
                {errors.email && <p className="text-[11px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.email}</p>}
              </div>

              {/* Address */}
              <div id="field-address">
                <label className="text-[10px] font-black uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted-dim)' }}>
                  Full Delivery Address
                </label>
                <textarea
                  rows={3}
                  placeholder={`e.g. 12 High Street, ${town || 'London'}, SW1A 1AA`}
                  value={address}
                  onChange={e => { setAddress(e.target.value); setErrors(er => ({ ...er, address: '' })); }}
                  className="w-full px-4 py-3.5 rounded-2xl border text-sm font-semibold outline-none transition-all resize-none"
                  style={inputStyle(!!errors.address)}
                />
                {errors.address && <p className="text-[11px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.address}</p>}
              </div>
            </div>
          </section>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'var(--orange)' }}
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </button>

        </div>
      </main>

      {/* ——— BOTTOM SHEET ——— */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div
            ref={sheetRef}
            className="rounded-t-3xl overflow-hidden flex flex-col"
            style={{
              background: 'var(--background)',
              border: '1px solid var(--border)',
              maxHeight: '92dvh',
            }}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
              <div className="w-12 h-1 rounded-full" style={{ background: 'var(--border)' }} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4 flex-shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
              <div>
                <h2 className="text-lg font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
                  Order Confirmed
                </h2>
                <p className="text-[11px] font-bold uppercase tracking-widest mt-0.5" style={{ color: 'var(--muted)' }}>
                  Your delivery is on the way
                </p>
              </div>
              <button
                onClick={() => setSheetOpen(false)}
                className="p-2 rounded-xl border"
                style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
              >
                <X className="h-4 w-4" style={{ color: 'var(--muted)' }} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1">
              <div className="px-6 py-5 space-y-5">

                {/* ETA badge */}
                <div
                  className="flex items-center gap-3 px-5 py-4 rounded-2xl border"
                  style={{ background: 'rgba(255,98,0,0.07)', borderColor: 'rgba(255,98,0,0.3)' }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,98,0,0.12)' }}
                  >
                    <Clock className="h-5 w-5" style={{ color: 'var(--orange)' }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest block" style={{ color: 'var(--muted-dim)' }}>
                      Estimated Arrival
                    </span>
                    <span className="text-2xl font-black" style={{ color: 'var(--orange)' }}>
                      15–20 min
                    </span>
                  </div>
                </div>

                {/* Order recap */}
                <div
                  className="flex items-center justify-between px-5 py-3.5 rounded-2xl border"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                    {buildSummary(singles, boxes)}
                  </span>
                  <span className="text-lg font-black" style={{ color: 'var(--foreground)' }}>
                    £{total.toFixed(2)}
                  </span>
                </div>

                {/* Map */}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] block mb-2" style={{ color: 'var(--muted-dim)' }}>
                    Live Tracking
                  </span>
                  <div className="w-full h-64 rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                    <DeliveryMap buyerAddress={`${address}, ${town}, UK`} />
                  </div>
                  <p className="text-[10px] font-medium text-center mt-2" style={{ color: 'var(--muted-dim)' }}>
                    🛵 Your delivery agent is heading your way
                  </p>
                </div>

              </div>
            </div>

            {/* Sticky CTA */}
            <div className="px-6 py-5 flex-shrink-0" style={{ borderTop: '1px solid var(--border)', background: 'var(--background)' }}>
              <button
                onClick={handleCompleteOrder}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: 'var(--orange)' }}
              >
                Complete Order — Pay £{total.toFixed(2)}
                <ChevronRight className="h-4 w-4" />
              </button>
              <p className="text-[10px] font-medium text-center mt-3" style={{ color: 'var(--muted-dim)' }}>
                You will be shown payment details on the next screen
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <Loader2 className="h-6 w-6 animate-spin" style={{ color: 'var(--orange)' }} />
      </div>
    }>
      <CheckoutInner />
    </Suspense>
  );
}
