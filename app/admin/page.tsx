'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ShieldCheck, LogOut, Settings, CreditCard, Link2,
  Plus, Pencil, Trash2, Check, X, Loader2, Eye, EyeOff,
  ArrowUpDown, ToggleLeft, ToggleRight
} from 'lucide-react';
import {
  verifyAdminPin,
  getAppSettings,
  updateSetting,
  getAllBankDetails,
  createBankDetail,
  updateBankDetail,
  deleteBankDetail,
} from '@/app/actions/admin';
import type { AppSettings } from '@/app/actions/admin';
import type { BankDetail } from '@/lib/db/neon-schema';

const SESSION_KEY = 'sw_admin_auth';

/* ═══════════════════════════════════════════════════════════
   PIN SCREEN
═══════════════════════════════════════════════════════════ */
function PinScreen({ onVerified }: { onVerified: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) return;
    setLoading(true);
    setError('');
    const ok = await verifyAdminPin(pin);
    if (ok) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onVerified();
    } else {
      setError('Incorrect PIN. Try again.');
      setPin('');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--background)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(255,98,0,0.1)', border: '1px solid rgba(255,98,0,0.3)' }}
          >
            <ShieldCheck className="h-8 w-8" style={{ color: 'var(--orange)' }} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
            Admin Access
          </h1>
          <p className="text-sm font-medium mt-1" style={{ color: 'var(--muted)' }}>
            Enter your PIN to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPin ? 'text' : 'password'}
              inputMode="numeric"
              placeholder="Enter PIN"
              value={pin}
              onChange={e => setPin(e.target.value)}
              autoFocus
              className="w-full h-14 px-5 pr-12 rounded-2xl border text-lg font-black tracking-[0.5em] text-center outline-none transition-all"
              style={{
                background: 'var(--surface)',
                borderColor: error ? 'rgb(239,68,68)' : 'var(--border)',
                color: 'var(--foreground)',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPin(v => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPin
                ? <EyeOff className="h-4 w-4" style={{ color: 'var(--muted)' }} />
                : <Eye className="h-4 w-4" style={{ color: 'var(--muted)' }} />}
            </button>
          </div>

          {error && (
            <p className="text-[11px] font-black uppercase tracking-widest text-center" style={{ color: 'rgb(239,68,68)' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !pin}
            className="w-full h-14 rounded-2xl text-sm font-black uppercase tracking-widest text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ background: 'var(--orange)' }}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION CARD
═══════════════════════════════════════════════════════════ */
function SectionCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-2.5 px-5 py-4 border-b" style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}>
        <Icon className="h-4 w-4" style={{ color: 'var(--orange)' }} />
        <span className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--foreground)' }}>
          {title}
        </span>
      </div>
      <div style={{ background: 'var(--surface)' }}>{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   INLINE INPUT
═══════════════════════════════════════════════════════════ */
function InlineInput({ label, value, onChange, onSave, saving }: {
  label: string; value: string; onChange: (v: string) => void; onSave: () => void; saving: boolean;
}) {
  return (
    <div className="px-5 py-4 border-b last:border-0 flex items-center gap-3" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="flex-1 min-w-0">
        <label className="text-[10px] font-black uppercase tracking-widest block mb-1" style={{ color: 'var(--muted-dim)' }}>
          {label}
        </label>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full h-10 px-3 rounded-xl border text-sm font-semibold outline-none transition-all"
          style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
        />
      </div>
      <button
        onClick={onSave}
        disabled={saving}
        className="mt-5 flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest text-white transition-all hover:opacity-90 disabled:opacity-50 flex-shrink-0"
        style={{ background: 'var(--orange)' }}
      >
        {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
        Save
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BANK DETAIL ROW
═══════════════════════════════════════════════════════════ */
function BankRow({ row, onSave, onDelete }: {
  row: BankDetail;
  onSave: (id: number, label: string, value: string, sortOrder: number, isActive: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(row.label);
  const [value, setValue] = useState(row.value);
  const [sortOrder, setSortOrder] = useState(String(row.sortOrder));
  const [isActive, setIsActive] = useState(row.isActive);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const save = async () => {
    setSaving(true);
    await onSave(row.id, label, value, Number(sortOrder), isActive);
    setSaving(false);
    setEditing(false);
  };

  const doDelete = async () => {
    setDeleting(true);
    await onDelete(row.id);
  };

  if (editing) {
    return (
      <div className="px-5 py-4 border-b last:border-0 space-y-3" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(255,98,0,0.03)' }}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest block mb-1" style={{ color: 'var(--muted-dim)' }}>Label</label>
            <input
              value={label} onChange={e => setLabel(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border text-sm font-semibold outline-none"
              style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest block mb-1" style={{ color: 'var(--muted-dim)' }}>Value</label>
            <input
              value={value} onChange={e => setValue(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border text-sm font-semibold outline-none"
              style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-24">
            <label className="text-[10px] font-black uppercase tracking-widest block mb-1" style={{ color: 'var(--muted-dim)' }}>Order</label>
            <input
              type="number" value={sortOrder} onChange={e => setSortOrder(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border text-sm font-semibold outline-none"
              style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            />
          </div>
          <div className="flex items-center gap-2 mt-5">
            <button
              onClick={() => setIsActive(v => !v)}
              className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest"
              style={{ color: isActive ? 'rgb(34,197,94)' : 'var(--muted)' }}
            >
              {isActive ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
              {isActive ? 'Active' : 'Hidden'}
            </button>
          </div>
          <div className="flex gap-2 ml-auto mt-5">
            <button onClick={() => setEditing(false)} className="flex items-center gap-1 px-3 py-2 rounded-xl border text-[11px] font-black uppercase tracking-widest" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
              <X className="h-3 w-3" /> Cancel
            </button>
            <button onClick={save} disabled={saving} className="flex items-center gap-1 px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest text-white disabled:opacity-50" style={{ background: 'var(--orange)' }}>
              {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />} Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-b last:border-0 group" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="flex items-center gap-3 min-w-0">
        <ArrowUpDown className="h-3 w-3 flex-shrink-0" style={{ color: 'var(--muted-dim)' }} />
        <div className="min-w-0">
          <span className="text-[10px] font-black uppercase tracking-widest block" style={{ color: 'var(--muted-dim)' }}>{row.label}</span>
          <span className="text-sm font-black uppercase tracking-tight" style={{ color: row.isActive ? 'var(--foreground)' : 'var(--muted-dim)' }}>{row.value}</span>
        </div>
        {!row.isActive && (
          <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ background: 'var(--surface-elevated)', color: 'var(--muted-dim)' }}>
            Hidden
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
        <button onClick={() => setEditing(true)} className="p-2 rounded-lg border transition-all" style={{ borderColor: 'var(--border)', background: 'var(--surface-elevated)', color: 'var(--muted)' }}>
          <Pencil className="h-3 w-3" />
        </button>
        {confirmDelete ? (
          <div className="flex items-center gap-1">
            <button onClick={doDelete} disabled={deleting} className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white" style={{ background: 'rgb(239,68,68)' }}>
              {deleting ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Delete?'}
            </button>
            <button onClick={() => setConfirmDelete(false)} className="p-1.5 rounded-lg border" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)} className="p-2 rounded-lg border transition-all" style={{ borderColor: 'var(--border)', background: 'var(--surface-elevated)', color: 'var(--muted)' }}>
            <Trash2 className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ADD BANK DETAIL FORM
═══════════════════════════════════════════════════════════ */
function AddBankDetailForm({ onAdd }: { onAdd: (label: string, value: string, sortOrder: number) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !value) return;
    setSaving(true);
    await onAdd(label, value, Number(sortOrder) || 99);
    setLabel(''); setValue(''); setSortOrder('');
    setSaving(false);
    setOpen(false);
  };

  if (!open) {
    return (
      <div className="px-5 py-3">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all hover:opacity-70"
          style={{ color: 'var(--orange)' }}
        >
          <Plus className="h-3.5 w-3.5" /> Add Row
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="px-5 py-4 border-t space-y-3" style={{ borderColor: 'var(--border)', background: 'rgba(255,98,0,0.03)' }}>
      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--orange)' }}>New Row</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest block mb-1" style={{ color: 'var(--muted-dim)' }}>Label</label>
          <input value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g. IBAN" required
            className="w-full h-10 px-3 rounded-xl border text-sm font-semibold outline-none"
            style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest block mb-1" style={{ color: 'var(--muted-dim)' }}>Value</label>
          <input value={value} onChange={e => setValue(e.target.value)} placeholder="e.g. GB29..." required
            className="w-full h-10 px-3 rounded-xl border text-sm font-semibold outline-none"
            style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-24">
          <label className="text-[10px] font-black uppercase tracking-widest block mb-1" style={{ color: 'var(--muted-dim)' }}>Order</label>
          <input type="number" value={sortOrder} onChange={e => setSortOrder(e.target.value)} placeholder="99"
            className="w-full h-10 px-3 rounded-xl border text-sm font-semibold outline-none"
            style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
        </div>
        <div className="flex gap-2 ml-auto mt-5">
          <button type="button" onClick={() => setOpen(false)} className="flex items-center gap-1 px-3 py-2 rounded-xl border text-[11px] font-black uppercase tracking-widest" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
            <X className="h-3 w-3" /> Cancel
          </button>
          <button type="submit" disabled={saving} className="flex items-center gap-1 px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest text-white disabled:opacity-50" style={{ background: 'var(--orange)' }}>
            {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />} Add
          </button>
        </div>
      </div>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN DASHBOARD
═══════════════════════════════════════════════════════════ */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [bankRows, setBankRows] = useState<BankDetail[]>([]);
  const [loading, setLoading] = useState(true);

  const [waUrl, setWaUrl] = useState('');
  const [tgUrl, setTgUrl] = useState('');
  const [savingWa, setSavingWa] = useState(false);
  const [savingTg, setSavingTg] = useState(false);
  const [savingMode, setSavingMode] = useState(false);

  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const [s, b] = await Promise.all([getAppSettings(), getAllBankDetails()]);
    setSettings(s);
    setWaUrl(s.whatsappUrl);
    setTgUrl(s.telegramUrl);
    setBankRows(b);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleMode = async () => {
    if (!settings) return;
    const next = settings.checkoutMode === 'bank' ? 'social' : 'bank';
    setSavingMode(true);
    await updateSetting('checkout_mode', next);
    setSettings(s => s ? { ...s, checkoutMode: next } : s);
    setSavingMode(false);
    showToast(`Switched to ${next === 'bank' ? 'Bank Checkout' : 'WhatsApp / Telegram'} mode`);
  };

  const saveWa = async () => {
    setSavingWa(true);
    await updateSetting('whatsapp_url', waUrl);
    setSavingWa(false);
    showToast('WhatsApp URL saved');
  };

  const saveTg = async () => {
    setSavingTg(true);
    await updateSetting('telegram_url', tgUrl);
    setSavingTg(false);
    showToast('Telegram URL saved');
  };

  const handleSaveBankRow = async (id: number, label: string, value: string, sortOrder: number, isActive: boolean) => {
    await updateBankDetail(id, label, value, sortOrder, isActive);
    await load();
    showToast('Bank detail updated');
  };

  const handleDeleteBankRow = async (id: number) => {
    await deleteBankDetail(id);
    await load();
    showToast('Row deleted');
  };

  const handleAddBankRow = async (label: string, value: string, sortOrder: number) => {
    await createBankDetail(label, value, sortOrder);
    await load();
    showToast('Row added');
  };

  const isBankMode = settings?.checkoutMode === 'bank';

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="glass border-b sticky top-0 z-50" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,98,0,0.12)' }}>
              <Settings className="h-4 w-4" style={{ color: 'var(--orange)' }} />
            </div>
            <span className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
              Smart<span style={{ color: 'var(--orange)' }}>Whip</span> Admin
            </span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl border transition-all hover:opacity-70"
            style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
          >
            <LogOut className="h-3 w-3" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin" style={{ color: 'var(--orange)' }} />
          </div>
        ) : (
          <>
            {/* ── Checkout Mode Toggle ── */}
            <SectionCard title="Checkout Mode" icon={ToggleRight}>
              <div className="px-5 py-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
                    {isBankMode ? 'Bank Transfer Checkout' : 'WhatsApp / Telegram Ordering'}
                  </p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--muted)' }}>
                    {isBankMode
                      ? 'Customers follow the checkout flow and pay by bank transfer'
                      : 'Customers order directly via WhatsApp or Telegram'}
                  </p>
                </div>
                <button
                  onClick={toggleMode}
                  disabled={savingMode}
                  className="flex-shrink-0 transition-all hover:opacity-80 disabled:opacity-50"
                >
                  {savingMode
                    ? <Loader2 className="h-8 w-8 animate-spin" style={{ color: 'var(--orange)' }} />
                    : isBankMode
                      ? <ToggleRight className="h-10 w-10" style={{ color: 'var(--orange)' }} />
                      : <ToggleLeft className="h-10 w-10" style={{ color: 'var(--muted)' }} />
                  }
                </button>
              </div>
              <div className="px-5 pb-4">
                <div
                  className="px-4 py-2.5 rounded-xl text-[11px] font-bold"
                  style={{
                    background: isBankMode ? 'rgba(255,98,0,0.08)' : 'rgba(34,197,94,0.08)',
                    color: isBankMode ? 'var(--orange)' : 'rgb(34,197,94)',
                    border: `1px solid ${isBankMode ? 'rgba(255,98,0,0.2)' : 'rgba(34,197,94,0.2)'}`,
                  }}
                >
                  {isBankMode
                    ? '⚡ Order Now button active — WhatsApp/Telegram shown as disabled'
                    : '💬 WhatsApp & Telegram buttons active — Order Now hidden'}
                </div>
              </div>
            </SectionCard>

            {/* ── Social Links ── */}
            <SectionCard title="Ordering URLs" icon={Link2}>
              <InlineInput
                label="WhatsApp URL"
                value={waUrl}
                onChange={setWaUrl}
                onSave={saveWa}
                saving={savingWa}
              />
              <InlineInput
                label="Telegram URL"
                value={tgUrl}
                onChange={setTgUrl}
                onSave={saveTg}
                saving={savingTg}
              />
            </SectionCard>

            {/* ── Bank Details ── */}
            <SectionCard title="Bank Details" icon={CreditCard}>
              {bankRows.length === 0 ? (
                <p className="px-5 py-4 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                  No rows yet
                </p>
              ) : (
                bankRows.map(row => (
                  <BankRow
                    key={row.id}
                    row={row}
                    onSave={handleSaveBankRow}
                    onDelete={handleDeleteBankRow}
                  />
                ))
              )}
              <AddBankDetailForm onAdd={handleAddBankRow} />
            </SectionCard>
          </>
        )}
      </main>

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl text-sm font-black uppercase tracking-widest text-white shadow-xl z-50 transition-all"
          style={{ background: 'var(--orange)' }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const ok = sessionStorage.getItem(SESSION_KEY) === '1';
    setAuthed(ok);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <Loader2 className="h-6 w-6 animate-spin" style={{ color: 'var(--orange)' }} />
      </div>
    );
  }

  if (!authed) return <PinScreen onVerified={() => setAuthed(true)} />;
  return <Dashboard onLogout={handleLogout} />;
}
