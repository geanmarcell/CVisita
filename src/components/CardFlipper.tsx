import React, { useState } from 'react';
import { CardData, CardTheme } from '../types';
import { BusinessCardFront } from './BusinessCardFront';
import { BusinessCardBack } from './BusinessCardBack';
import { RotateCw, Sparkles, Smartphone, Download, Share2, Copy, Check } from 'lucide-react';
import { downloadVCard, copyToClipboard, getWhatsAppUrl } from '../utils/cardUtils';

interface CardFlipperProps {
  data: CardData;
  theme: CardTheme;
  onOpenRideCalculator: () => void;
  onOpenQRCodes: () => void;
}

export const CardFlipper: React.FC<CardFlipperProps> = ({
  data,
  theme,
  onOpenRideCalculator,
  onOpenQRCodes,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const waUrl = getWhatsAppUrl(data.phone, data.whatsappMessage);
    const textToCopy = `🚘 *${data.name} - ${data.title}*\n${data.tagline}\n\n📍 Atendimento: ${data.coverage}\n🚗 Veículo: ${data.vehicle}\n📲 WhatsApp: ${data.phone}\n💳 Pagamento: ${data.paymentMethods.join(', ')}\n\nChame direto no WhatsApp: ${waUrl}`;
    
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto space-y-6">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between w-full px-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Lado Atual:
          </span>
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
            {isFlipped ? 'Verso (Informações & Contatos)' : 'Frente (Destaque Principal)'}
          </span>
        </div>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <RotateCw className={`w-4 h-4 text-amber-400 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
          <span>Virar Cartão</span>
        </button>
      </div>

      {/* 3D Flip Card Container */}
      <div
        className="w-full perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full transition-transform duration-700 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Face */}
          <div className="w-full backface-hidden">
            <BusinessCardFront data={data} theme={theme} />
          </div>

          {/* Back Face */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <BusinessCardBack data={data} theme={theme} />
          </div>
        </div>
      </div>

      {/* Instructions Prompt */}
      <p className="text-xs text-zinc-400 flex items-center gap-1.5 animate-pulse">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        Clique no cartão para girar e ver o verso.
      </p>

      {/* Quick Action Bar for Gean & Passengers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-2">
        <button
          onClick={() => downloadVCard(data)}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-900/20 transition-all active:scale-95 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Baixar VCard</span>
        </button>

        <button
          onClick={onOpenQRCodes}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-bold text-xs sm:text-sm border border-amber-500/30 shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <Smartphone className="w-4 h-4" />
          <span>Ver QR Codes</span>
        </button>

        <button
          onClick={onOpenRideCalculator}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/20 transition-all active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Orçar Corrida</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs sm:text-sm border border-zinc-700 shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copiado!' : 'Copiar Dados'}</span>
        </button>
      </div>
    </div>
  );
};
