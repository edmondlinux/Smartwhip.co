'use client';

import { useState, useMemo } from 'react';
import { Search, ArrowRight, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import englandData from '@/data/england.json';
import scotlandData from '@/data/scotland.json';
import walesData from '@/data/wales.json';
import niData from '@/data/northern-ireland.json';

const gbData = [...englandData, ...scotlandData, ...walesData, ...niData];

const TOWNS_PER_PAGE = 50;

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const towns = useMemo(() => {
    const all = gbData.map(t => ({
      id: t.city.toLowerCase().replace(/\s+/g, '-'),
      name: t.city,
      admin: t.admin_name
    }));
    if (!searchQuery) return all;
    return all.filter(t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.admin.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(towns.length / TOWNS_PER_PAGE);
  const displayed = towns.slice((currentPage - 1) * TOWNS_PER_PAGE, currentPage * TOWNS_PER_PAGE);

  // Group displayed towns by first letter
  const grouped = useMemo(() => {
    const groups: Record<string, typeof displayed> = {};
    displayed.forEach(t => {
      const letter = t.name[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(t);
    });
    return groups;
  }, [displayed]);

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--background)' }}>

      {/* NAV */}
      <header className="glass border-b sticky top-0 z-50" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="text-base font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
            Smart<span style={{ color: 'var(--orange)' }}>Whip</span>
          </Link>
          <Link href="/" className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: 'var(--muted)' }}>
            ← Back
          </Link>
        </div>
      </header>

      <main className="flex-grow">

        {/* PAGE HEADER + SEARCH */}
        <div className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--orange)' }}>
                  Wholesale & Retail · UK-Wide
                </span>
                <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight mt-2" style={{ color: 'var(--foreground)' }}>
                  All Delivery<br />Locations
                </h1>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <div className="relative w-full lg:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--muted)' }} />
                  <input
                    type="text"
                    placeholder="Filter by city or region..."
                    className="w-full pl-11 pr-5 h-12 rounded-2xl border text-sm font-semibold outline-none"
                    style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  />
                </div>
                <div className="flex gap-3 text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                  <span>{towns.length} locations</span>
                  <span style={{ color: 'var(--border)' }}>·</span>
                  <span>£30 single · £130 case</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BRANDS STRIP */}
        <div className="border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <div className="flex items-center gap-0 overflow-x-auto">
              {['SmartWhip', 'Cream Deluxe', 'FastGas', 'GoldWhip'].map((b, i) => (
                <div key={i} className="flex-shrink-0 px-8 py-5 border-r text-xs font-black uppercase tracking-widest"
                  style={{ borderColor: 'var(--border)', color: i === 0 ? 'var(--foreground)' : 'var(--muted)' }}>
                  {b}
                </div>
              ))}
              <div className="flex-shrink-0 px-8 py-5 text-xs font-medium" style={{ color: 'var(--muted-dim)' }}>
                All brands in stock & available for immediate dispatch
              </div>
            </div>
          </div>
        </div>

        {/* DIRECTORY */}
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16">
          {Object.entries(grouped).map(([letter, group]) => (
            <div key={letter} className="mb-10">
              {/* Letter divider */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl font-black leading-none" style={{ color: 'var(--surface-elevated)' }}>{letter}</span>
                <div className="flex-grow h-px" style={{ background: 'var(--border-subtle)' }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>{group.length}</span>
              </div>

              {/* Rows */}
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                {group.map((town, idx) => (
                  <Link
                    key={town.id}
                    href={`/towns/${town.id}`}
                    className="flex items-center justify-between px-6 py-4 border-b last:border-0 transition-all group"
                    style={{ borderColor: 'var(--border-subtle)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div className="flex items-center gap-4">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: 'var(--orange)' }} />
                      <div>
                        <span className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>{town.name}</span>
                        <span className="ml-3 text-xs font-bold" style={{ color: 'var(--muted)' }}>{town.admin}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="hidden sm:flex items-center gap-3">
                        <span className="text-xs font-black" style={{ color: 'var(--foreground)' }}>£30</span>
                        <span className="text-xs" style={{ color: 'var(--muted-dim)' }}>/</span>
                        <span className="text-xs font-black" style={{ color: 'var(--orange)' }}>£130</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
                        style={{ background: 'rgba(34,197,94,0.08)', color: 'rgb(34,197,94)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        Live
                      </span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" style={{ color: 'var(--muted)' }} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* PAGINATION */}
          <div className="mt-16 flex items-center justify-between border-t pt-10" style={{ borderColor: 'var(--border)' }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-xs font-black uppercase tracking-widest disabled:opacity-30 transition-all"
              style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'var(--surface)' }}
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <span className="text-xs font-bold" style={{ color: 'var(--muted)' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-xs font-black uppercase tracking-widest disabled:opacity-30 transition-all"
              style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'var(--surface)' }}
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t py-8" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--muted-dim)' }}>
            © 2026 SmartWhip International
          </p>
        </div>
      </footer>
    </div>
  );
}
