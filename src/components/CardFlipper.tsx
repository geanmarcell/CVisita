import React, { useState } from 'react';
import { CardData, CardTheme } from '../types';
import { BusinessCardFront } from './BusinessCardFront';
import { BusinessCardBack } from './BusinessCardBack';
import { RotateCw, Sparkles, Smartphone, Download, Copy, Check, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
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
  const [zoomLevel, setZoomLevel] = useState<'normal' | 'large' | 'full'>('normal');

  const handleCopyLink = async () => {
    const waUrl = getWhatsAppUrl(data.phone, data.whatsappMessage);
    const textToCopy = `🚘 *${data.name} - ${data.title}*\n${data.tagline}\n\n📍 Atendimento: ${data.coverage}\n🚗 Veículo: ${data.vehicle}\n📲 WhatsApp: ${data.phone}\n💳 Pagamento: ${data.paymentMethods.join(', ')}\n\nChame direto no WhatsApp: ${waUrl}`;
    
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getContainerScaleClass = () => {
    if (zoomLevel === 'large') return 'scale-105 sm:scale-110 my-4 sm:my-6 transition-all duration-300';
    if (zoomLevel === 'full') return 'scale-110 sm:scale-125 my-6 sm:my-10 transition-all duration-300';
    return 'scale-100 transition-all duration-300';
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto space-y-4 sm:space-y-6 px-1 sm:px-0">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between w-full gap-3 px-1">
        <div className="flex items-center gap-2.5">
          <span className="text-xs sm:text-sm md:text-base font-bold text-zinc-300 uppercase tracking-wider hidden sm:inline">
            Lado Atual:
          </span>
          <span className="px-3 py-1.5 text-xs sm:text-sm md:text-base font-extrabold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
            {isFlipped ? 'Verso (Contatos)' : 'Frente (Destaque)'}
          </span>
        </div>

        <div className="flex items-center gap-2 ml-auto sm:ml-0">
          {/* Zoom controls for mobile and desktop readability */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1">
            <button
              onClick={() => setZoomLevel('normal')}
              title="Tamanho Normal"
              className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                zoomLevel === 'normal' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              100%
            </button>
            <button
              onClick={() => setZoomLevel('large')}
              title="Aumentar para Leitura"
              className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                zoomLevel === 'large' ? 'bg-amber-500/20 text-amber-300' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              115%
            </button>
            <button
              onClick={() => setZoomLevel('full')}
              title="Modo Ampliado"
              className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                zoomLevel === 'full' ? 'bg-amber-500/30 text-amber-200' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              130%
            </button>
          </div>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm md:text-base font-extrabold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <RotateCw className={`w-4 h-4 text-amber-400 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
            <span>Virar</span>
          </button>
        </div>
      </div>

      {/* 3D Flip Card Container with Zoom Scaling */}
      <div className={`w-full ${getContainerScaleClass()}`}>
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
      </div>

      {/* Instructions Prompt */}
      <p className="text-xs text-zinc-400 flex items-center justify-center gap-1.5 animate-pulse pt-1">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        Toque no cartão para girar.
      </p>

      {/* Quick Action Bar for Gean & Passengers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full pt-2">
        <button
          onClick={() => downloadVCard(data)}
          className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-base md:text-lg shadow-lg shadow-blue-900/20 transition-all active:scale-95 cursor-pointer"
        >
          <Download className="w-5 h-5" />
          <span>Baixar VCard</span>
        </button>

        <button
          onClick={onOpenQRCodes}
          className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-extrabold text-xs sm:text-base md:text-lg border border-amber-500/30 shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <Smartphone className="w-5 h-5" />
          <span>QR Codes</span>
        </button>

        <button
          onClick={onOpenRideCalculator}
          className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-base md:text-lg shadow-lg shadow-emerald-900/20 transition-all active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-5 h-5" />
          <span>Orçar Corrida</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-extrabold text-xs sm:text-base md:text-lg border border-zinc-700 shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
          <span>{copied ? 'Copiado!' : 'Copiar Dados'}</span>
        </button>
      </div>
    </div>
  );
};
