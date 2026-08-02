import React from 'react';
import { CardData, CardTheme } from '../types';
import { Car, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { getWhatsAppUrl } from '../utils/cardUtils';

interface BusinessCardFrontProps {
  data: CardData;
  theme: CardTheme;
  showQrCode?: boolean;
}

export const BusinessCardFront: React.FC<BusinessCardFrontProps> = ({
  data,
  theme,
  showQrCode = true,
}) => {
  const waUrl = getWhatsAppUrl(data.phone, data.whatsappMessage);
  const isLight = theme.id === 'minimal';
  const isSophisticated = theme.id === 'sophisticated';

  return (
    <div
      id="card-front"
      className={`relative w-full aspect-[9/5] rounded-xl sm:rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 ${theme.cardBg} border ${theme.border}`}
    >
      {/* Geometric SVG Background Grid for Sophisticated Dark */}
      {isSophisticated ? (
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="sophisticated-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sophisticated-grid)" />
          </svg>
        </div>
      ) : (
        <>
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        </>
      )}

      {/* Top Header Row */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 sm:p-2.5 rounded-xl ${theme.badgeBg} shadow-inner`}>
            <Car className={`w-5 h-5 sm:w-6 sm:h-6 ${theme.accentText}`} />
          </div>
          <div>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase ${theme.badgeBg}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              Serviço Vip
            </span>
          </div>
        </div>

        {/* Location Badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${isLight ? 'bg-slate-200/80 text-slate-800' : 'bg-white/10 text-zinc-200 backdrop-blur-sm'}`}>
          <MapPin className={`w-3.5 h-3.5 ${theme.accentText}`} />
          <span>{data.coverage}</span>
        </div>
      </div>

      {/* Center Main Identity */}
      <div className={`relative z-10 my-auto py-2 ${isSophisticated ? 'text-center flex flex-col items-center' : ''}`}>
        {isSophisticated ? (
          <>
            <h1
              className="text-2xl sm:text-4xl font-light tracking-[0.15em] uppercase text-white mb-1"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              {data.name}
            </h1>
            <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/60 mb-3 font-sans">
              {data.title}
            </p>
            <div className="h-[1px] w-14 bg-white/40 mb-3" />
            <p className="text-xs sm:text-sm italic text-white/70 tracking-wide font-light max-w-md">
              "{data.tagline}"
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className={`w-4 h-4 ${theme.accentText}`} />
              <h1 className={`text-2xl sm:text-4xl font-black tracking-tight uppercase ${theme.textPrimary}`}>
                {data.name}
              </h1>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className={`h-0.5 w-8 rounded-full`} style={{ backgroundColor: theme.accent }} />
              <h2 className={`text-xs sm:text-sm font-bold tracking-widest uppercase ${theme.accentText}`}>
                {data.title}
              </h2>
            </div>

            <p className={`text-xs sm:text-base font-medium max-w-md leading-relaxed ${theme.textSecondary}`}>
              "{data.tagline}"
            </p>
          </>
        )}
      </div>

      {/* Bottom Footer Row */}
      <div className="relative z-10 flex items-end justify-between pt-3 border-t border-white/10">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/50">
            Veículo Oficial
          </span>
          <span className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 ${theme.textPrimary}`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {data.vehicle}
          </span>
        </div>

        {showQrCode && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold">Escanear p/</span>
              <span className={`text-[11px] font-bold ${theme.accentText}`}>WhatsApp Direct</span>
            </div>
            <div className="p-1.5 bg-white rounded-lg shadow-md border border-zinc-200 flex items-center justify-center">
              <QRCodeSVG
                value={waUrl}
                size={44}
                bgColor={theme.qrBgColor}
                fgColor={theme.qrFgColor}
                level="M"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
