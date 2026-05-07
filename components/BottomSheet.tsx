'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, X, MapPin, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import englandData from '@/data/england.json';
import scotlandData from '@/data/scotland.json';
import walesData from '@/data/wales.json';
import niData from '@/data/northern-ireland.json';

import Link from 'next/link';
import { searchTownsAction } from '@/app/actions';

const gbData = [...englandData, ...scotlandData, ...walesData, ...niData];

export function BottomSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const [dynamicResults, setDynamicResults] = useState<{ id: string; name: string; admin: string }[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const towns = useMemo(() => gbData.map(t => ({
    id: t.city.toLowerCase().replace(/\s+/g, '-'),
    name: t.city,
    admin: t.admin_name,
  })), []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2500 && !hasScrolled) {
        setIsOpen(true);
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  useEffect(() => {
    const fetchDynamic = async () => {
      if (search.length < 3) { setDynamicResults([]); return; }
      setIsSearching(true);
      try {
        const results = await searchTownsAction(search);
        setDynamicResults(
          results.filter(r => !towns.some(t => t.name.toLowerCase() === r.name.toLowerCase()))
        );
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    };
    const timer = setTimeout(fetchDynamic, 300);
    return () => clearTimeout(timer);
  }, [search, towns]);

  const searchResults = useMemo(() => {
    if (!search) return [];
    const internal = towns
      .filter(t => t.name.toLowerCase().startsWith(search.toLowerCase()))
      .slice(0, 5);
    const combined = [...internal, ...dynamicResults];
    const seen = new Set<string>();
    return combined
      .filter(item => { if (seen.has(item.id)) return false; seen.add(item.id); return true; })
      .slice(0, 10);
  }, [search, towns, dynamicResults]);

  if (!isOpen && !hasScrolled) return null;

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 transition-transform duration-400 ease-in-out',
        isOpen ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div
        className="rounded-t-3xl shadow-[0_-16px_60px_rgba(0,0,0,0.6)] border-t p-6 pb-8"
        style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
      >
        <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: 'var(--border)' }} />

        <div className="flex justify-between items-start mb-5">
          <div className="flex-1">
            <h2 className="text-base font-black uppercase tracking-tight mb-1" style={{ color: 'var(--foreground)' }}>
              Find Your Town
            </h2>
            <p className="text-xs font-medium" style={{ color: 'var(--muted)' }}>
              Quickly find your town to order SmartWhip with direct delivery.
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl border transition-all ml-4"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--muted)' }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" style={{ color: 'var(--muted)' }} />
          <input
            type="text"
            placeholder="Search for your town..."
            className="w-full pl-11 pr-11 h-12 rounded-2xl border text-sm font-semibold outline-none transition-all"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
          {isSearching && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin" style={{ color: 'var(--orange)' }} />
          )}
        </div>

        {search && (
          <div
            className="mt-4 max-h-[40vh] overflow-y-auto rounded-2xl border divide-y"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            {searchResults.length > 0 ? (
              searchResults.map(town => (
                <Link
                  key={town.id}
                  href={`/towns/${town.id}`}
                  className="flex items-center justify-between px-4 py-3 transition-colors"
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-elevated)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: 'var(--orange)' }} />
                    <span className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>{town.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {town.admin && (
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                        {town.admin}
                      </span>
                    )}
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: 'var(--muted)' }} />
                  </div>
                </Link>
              ))
            ) : !isSearching ? (
              <div className="px-4 py-4 text-xs text-center font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                No results for &quot;{search}&quot;
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
