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
      className={`relative w-full aspect-[9/5] rounded-2xl p-4 sm:p-7 md:p-9 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 ${theme.cardBg} border ${theme.border}`}
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
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2 sm:pb-3">
        <div className="flex items-center gap-2">
          <Car className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${theme.accentText}`} />
          <h3 className={`text-xs sm:text-base md:text-lg font-bold tracking-wide ${theme.textPrimary}`}>
            {data.subtitle}
          </h3>
        </div>
        <div className={`text-[10px] sm:text-xs md:text-sm font-bold px-2.5 sm:px-3 py-1 rounded-full ${theme.badgeBg}`}>
          {data.coverage}
        </div>
      </div>

      {/* Middle Content: Vehicle + Services Grid */}
      <div className="relative z-10 grid grid-cols-12 gap-3 my-auto py-1 sm:py-2">
        {/* Left column - Vehicle & Services */}
        <div className="col-span-8 flex flex-col justify-center space-y-2 sm:space-y-3">
          {/* Services List */}
          <div className="space-y-1">
            <span className="text-[9px] sm:text-xs uppercase tracking-widest text-white/50 font-bold block">
              Serviços Prestados
            </span>
            <div className="grid grid-cols-1 gap-1">
              {data.services.slice(0, 3).map((service, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base">
                  <span className="text-amber-400 font-bold">•</span>
                  <span className={`${theme.textSecondary} truncate font-medium`}>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle */}
          <div className="flex items-center gap-2 text-xs sm:text-base md:text-lg">
            <span className="text-[9px] sm:text-xs uppercase tracking-widest text-white/50 font-bold">Veículo:</span>
            <span className={`font-bold ${theme.accentText} truncate`}>{data.vehicle}</span>
          </div>
        </div>

        {/* Right column - QR Code Contato */}
        {showQrCode && (
          <div className="col-span-4 flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
            <div className="p-1 sm:p-1.5 bg-white rounded-lg shadow-md mb-1 sm:mb-2">
              <QRCodeSVG
                value={vcardStr}
                size={52}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="L"
              />
            </div>
            <span className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] font-semibold text-white/70 leading-tight">
              Contato QR
            </span>
          </div>
        )}
      </div>

      {/* Bottom Row - WhatsApp Contact & Payment Info */}
      <div className="relative z-10 pt-2 sm:pt-3 border-t border-white/10 flex items-center justify-between gap-2">
        {/* WhatsApp Button Style Contact */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-base md:text-lg shadow-md transition-all group"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current group-hover:scale-110 transition-transform" />
          <span className="truncate">{data.phone}</span>
        </a>

        {/* Payment Methods */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base text-white/80">
          <CreditCard className={`w-4 h-4 ${theme.accentText}`} />
          <span className={`font-bold ${theme.textPrimary} truncate`}>
            {data.paymentMethods.join(' • ')}
          </span>
        </div>
      </div>
    </div>
  );
};
