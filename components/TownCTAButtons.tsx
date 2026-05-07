'use client';

import { usePostHog } from 'posthog-js/react';
import { MessageCircle, Send } from 'lucide-react';

interface TownCTAButtonsProps {
  whatsappUrl: string;
  telegramUrl: string;
  town: string;
  variant: 'hero' | 'product';
}

export function TownCTAButtons({ whatsappUrl, telegramUrl, town, variant }: TownCTAButtonsProps) {
  const ph = usePostHog();

  const trackWhatsApp = () => {
    ph?.capture('whatsapp_clicked', {
      button_type: 'town-page',
      button_variant: variant,
      town,
      source_page: 'town',
    });
  };

  const trackTelegram = () => {
    ph?.capture('telegram_clicked', {
      button_type: 'town-page',
      button_variant: variant,
      town,
      source_page: 'town',
    });
  };

  if (variant === 'hero') {
    return (
      <>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsApp}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: '#25D366', boxShadow: '0 8px 24px rgba(37,211,102,0.2)' }}
        >
          <MessageCircle className="h-5 w-5" />
          Order via WhatsApp — {town}
        </a>
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackTelegram}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: '#0088cc', boxShadow: '0 8px 24px rgba(0,136,204,0.2)' }}
        >
          <Send className="h-5 w-5" />
          Order via Telegram — {town}
        </a>
      </>
    );
  }

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackWhatsApp}
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-white transition-all hover:opacity-90"
        style={{ background: '#25D366' }}
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp Order
      </a>
      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackTelegram}
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-white transition-all hover:opacity-90"
        style={{ background: '#0088cc' }}
      >
        <Send className="h-4 w-4" />
        Telegram Order
      </a>
    </>
  );
}
