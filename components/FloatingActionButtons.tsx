'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';

export function FloatingActionButtons() {
  const ph = usePostHog();
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL;
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL;

  if (!whatsappUrl && !telegramUrl) return null;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {whatsappUrl && (
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => ph?.capture('whatsapp_clicked', { button_type: 'floating', source_page: typeof window !== 'undefined' ? window.location.pathname : '' })}
          className="w-13 h-13 rounded-2xl flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 hover:shadow-green-900/40"
          style={{ background: '#25D366', width: '52px', height: '52px', boxShadow: '0 8px 32px rgba(37,211,102,0.25)' }}
          aria-label="WhatsApp"
        >
          <Image
            src="/logo/whatsapplogo.png"
            alt="WhatsApp"
            width={28}
            height={28}
            className="w-7 h-7"
          />
        </Link>
      )}
      {telegramUrl && (
        <Link
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => ph?.capture('telegram_clicked', { button_type: 'floating', source_page: typeof window !== 'undefined' ? window.location.pathname : '' })}
          className="rounded-2xl flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
          style={{ background: '#0088cc', width: '52px', height: '52px', boxShadow: '0 8px 32px rgba(0,136,204,0.25)' }}
          aria-label="Telegram"
        >
          <Image
            src="/logo/telegramlogo.png"
            alt="Telegram"
            width={28}
            height={28}
            className="w-7 h-7"
          />
        </Link>
      )}
    </div>
  );
}
