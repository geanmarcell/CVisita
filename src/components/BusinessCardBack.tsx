import React from 'react';
import { CardData, CardTheme } from '../types';
import { Phone, CreditCard, Car, CheckCircle2, MessageCircle, MapPin, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { getWhatsAppUrl, generateVCard } from '../utils/cardUtils';

interface BusinessCardBackProps {
  data: CardData;
  theme: CardTheme;
  showQrCode?: boolean;
}

export const BusinessCardBack: React.FC<BusinessCardBackProps> = ({
  data,
  theme,
  showQrCode = true,
}) => {
  const vcardStr = generateVCard(data);
  const waUrl = getWhatsAppUrl(data.phone, data.whatsappMessage);
  const isSophisticated = theme.id === 'sophisticated';

  return (
    <div
      id="card-back"
      className={`relative w-full aspect-[9/5] rounded-xl sm:rounded-2xl p-3.5 sm:p-7 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 ${theme.cardBg} border ${theme.border}`}
    >
      {/* Background elements */}
      {isSophisticated ? (
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      ) : (
        <>
          <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        </>
      )}

      {/* Top Banner Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-1.5 sm:pb-2.5">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Car className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${theme.accentText}`} />
          <h3 className={`text-[11px] sm:text-sm font-bold tracking-wide truncate max-w-[170px] sm:max-w-none ${theme.textPrimary}`}>
            {data.subtitle}
          </h3>
        </div>
        <div className={`text-[9px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 rounded ${theme.badgeBg}`}>
          {data.coverage}
        </div>
      </div>

      {/* Middle Content: Vehicle + Services Grid */}
      <div className="relative z-10 grid grid-cols-12 gap-2 my-auto py-1">
        {/* Left column - Vehicle & Services */}
        <div className="col-span-8 flex flex-col justify-center space-y-1 sm:space-y-2.5">
          {/* Services List */}
          <div className="space-y-0.5">
            <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-white/50 font-bold block">
              Serviços
            </span>
            <div className="grid grid-cols-1 gap-0.5 sm:gap-1">
              {data.services.slice(0, 3).map((service, idx) => (
                <div key={idx} className="flex items-center gap-1 text-[9px] sm:text-xs">
                  <span className="text-white/40">•</span>
                  <span className={`${theme.textSecondary} truncate font-medium`}>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-sm">
            <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-white/50 font-bold">Veículo:</span>
            <span className={`font-bold text-[10px] sm:text-sm ${theme.accentText} truncate`}>{data.vehicle}</span>
          </div>
        </div>

        {/* Right column - QR Code Contato */}
        {showQrCode && (
          <div className="col-span-4 flex flex-col items-center justify-center p-1 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
            <div className="p-1 bg-white rounded-md shadow-md mb-0.5 sm:mb-1.5">
              <QRCodeSVG
                value={vcardStr}
                size={40}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="L"
              />
            </div>
            <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-semibold text-white/60 leading-tight">
              Contato QR
            </span>
          </div>
        )}
      </div>

      {/* Bottom Row - WhatsApp Contact & Payment Info */}
      <div className="relative z-10 pt-1.5 sm:pt-2 border-t border-white/10 flex items-center justify-between gap-1.5">
        {/* WhatsApp Button Style Contact */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] sm:text-sm shadow-md transition-all group"
        >
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current group-hover:scale-110 transition-transform" />
          <span className="truncate">{data.phone}</span>
        </a>

        {/* Payment Methods */}
        <div className="flex items-center gap-1 text-[9px] sm:text-xs text-white/70">
          <CreditCard className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${theme.accentText}`} />
          <span className={`font-bold ${theme.textPrimary} truncate max-w-[120px] sm:max-w-none`}>
            {data.paymentMethods.join(' • ')}
          </span>
        </div>
      </div>
    </div>
  );
};
