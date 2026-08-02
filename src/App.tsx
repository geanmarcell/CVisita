import React, { useState, useEffect } from 'react';
import { CardData, CardThemeId, ActiveTab } from './types';
import { defaultCardData, themes } from './data/defaults';
import { CardFlipper } from './components/CardFlipper';
import { QRCodeSection } from './components/QRCodeSection';
import { RideCalculatorModal } from './components/RideCalculatorModal';
import { PrintSheet } from './components/PrintSheet';
import { TipsSection } from './components/TipsSection';
import { CardEditor } from './components/CardEditor';
import {
  Car,
  QrCode,
  Printer,
  Lightbulb,
  Sliders,
  MessageCircle,
  Download,
  Share2,
  Phone,
  ShieldCheck,
  Sparkles,
  MapPin,
  ExternalLink,
  Check
} from 'lucide-react';
import { downloadVCard, getWhatsAppUrl, copyToClipboard } from './utils/cardUtils';

export default function App() {
  const [cardData, setCardData] = useState<CardData>(() => {
    const saved = localStorage.getItem('gean_driver_card_data');
    return saved ? JSON.parse(saved) : defaultCardData;
  });

  const [themeId, setThemeId] = useState<CardThemeId>(() => {
    const saved = localStorage.getItem('gean_driver_theme_id');
    return (saved as CardThemeId) || 'sophisticated';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('preview');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('gean_driver_card_data', JSON.stringify(cardData));
  }, [cardData]);

  useEffect(() => {
    localStorage.setItem('gean_driver_theme_id', themeId);
  }, [themeId]);

  const activeTheme = themes[themeId] || themes.carbon;

  const handleResetDefaults = () => {
    setCardData(defaultCardData);
    setThemeId('sophisticated');
    localStorage.removeItem('gean_driver_card_data');
    localStorage.removeItem('gean_driver_theme_id');
  };

  const handleShareApp = async () => {
    const waUrl = getWhatsAppUrl(cardData.phone, cardData.whatsappMessage);
    const shareText = `🚗 *GEAN MARCELL - MOTORISTA PARTICULAR*\nSegurança, Conforto e Pontualidade para suas viagens!\n\nVeículo: ${cardData.vehicle}\nAtendimento: ${cardData.coverage}\n📲 WhatsApp: ${cardData.phone}\n\nChame direto no WhatsApp: ${waUrl}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Gean Marcell - Motorista Particular',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    const success = await copyToClipboard(shareText);
    if (success) {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-white selection:text-black overflow-x-hidden">
      {/* Visual Ambient Glow Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[120px] pointer-events-none -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-[120px] pointer-events-none -ml-40 -mb-40" />
      {/* Top Navbar */}
      <header className="no-print sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo & Identity */}
          <div
            onClick={() => setActiveTab('preview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-zinc-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white uppercase">
                  {cardData.name}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" /> VIP Driver
                </span>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-medium">
                {cardData.title} • {cardData.coverage}
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            <a
              href={getWhatsAppUrl(cardData.phone, cardData.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm md:text-base shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              <span>Chamar no WhatsApp</span>
            </a>

            <button
              onClick={handleShareApp}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-extrabold text-xs sm:text-sm md:text-base border border-zinc-700 transition-all cursor-pointer"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-amber-400" />}
              <span className="hidden sm:inline">{copiedShare ? 'Copiado!' : 'Compartilhar'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto no-scrollbar scroll-smooth border-t border-zinc-800/60">
          <nav className="flex items-center gap-1.5 py-2.5 min-w-max">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm md:text-base font-extrabold transition-all cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Car className="w-4 h-4 md:w-5 md:h-5" />
              <span>Visualizar Cartão</span>
            </button>

            <button
              onClick={() => setActiveTab('qrcodes')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm md:text-base font-extrabold transition-all cursor-pointer ${
                activeTab === 'qrcodes'
                  ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <QrCode className="w-4 h-4 md:w-5 md:h-5" />
              <span>QR Codes</span>
            </button>

            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm md:text-base font-extrabold text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              <span>Orçar Corrida</span>
            </button>

            <button
              onClick={() => setActiveTab('print')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm md:text-base font-extrabold transition-all cursor-pointer ${
                activeTab === 'print'
                  ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Printer className="w-4 h-4 md:w-5 md:h-5" />
              <span>Modo Impressão (9x5 cm)</span>
            </button>

            <button
              onClick={() => setActiveTab('tips')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm md:text-base font-extrabold transition-all cursor-pointer ${
                activeTab === 'tips'
                  ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Lightbulb className="w-4 h-4 md:w-5 md:h-5" />
              <span>Dicas para Motoristas</span>
            </button>

            <button
              onClick={() => setActiveTab('edit')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm md:text-base font-extrabold transition-all cursor-pointer ${
                activeTab === 'edit'
                  ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Sliders className="w-4 h-4 md:w-5 md:h-5" />
              <span>Personalizar Dados</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Hero & Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'preview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Introductory Banner */}
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs sm:text-sm font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Cartão de Visita Interativo 3D
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Seu Cartão de Visita Profissional
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed">
                Passe a melhor impressão para os seus passageiros. Apresentação elegante para corridas particulares, aeroportos e viagens.
              </p>
            </div>

            {/* 3D Flipper Stage */}
            <CardFlipper
              data={cardData}
              theme={activeTheme}
              onOpenRideCalculator={() => setIsCalculatorOpen(true)}
              onOpenQRCodes={() => setActiveTab('qrcodes')}
            />

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 max-w-5xl mx-auto border-t border-zinc-800/80 text-left">
              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
                  <QrCode className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base sm:text-lg md:text-xl">QR Code de Contato Inteligente</h3>
                <p className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed">
                  Permite ao passageiro salvar seu contato direto na agenda do celular com apenas um escaneamento de câmera.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base sm:text-lg md:text-xl">Chame Direto no WhatsApp</h3>
                <p className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed">
                  Link direto para conversa com mensagem de agendamento pré-formatada de corridas particulares.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 w-fit">
                  <Printer className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base sm:text-lg md:text-xl">Pronto para Impressão Gráfica</h3>
                <p className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed">
                  Proporção exata 9x5 cm com suporte para impressão em folha A4 completa ou gráfica rápida.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'qrcodes' && (
          <div className="animate-fade-in">
            <QRCodeSection data={cardData} theme={activeTheme} />
          </div>
        )}

        {activeTab === 'print' && (
          <div className="animate-fade-in">
            <PrintSheet
              data={cardData}
              theme={activeTheme}
              onBackToPreview={() => setActiveTab('preview')}
            />
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="animate-fade-in">
            <TipsSection data={cardData} />
          </div>
        )}

        {activeTab === 'edit' && (
          <div className="animate-fade-in">
            <CardEditor
              data={cardData}
              onChange={setCardData}
              activeThemeId={themeId}
              onThemeChange={setThemeId}
              onReset={handleResetDefaults}
            />
          </div>
        )}
      </main>

      {/* Ride Quote Modal */}
      <RideCalculatorModal
        data={cardData}
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* Bottom Sticky Action Bar on Mobile */}
      <div className="no-print sticky bottom-0 z-30 bg-zinc-950/95 border-t border-zinc-800 p-3 sm:hidden backdrop-blur-md">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <a
            href={getWhatsAppUrl(cardData.phone, cardData.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600 active:bg-emerald-500 text-white font-extrabold text-xs shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Direct</span>
          </a>

          <button
            onClick={() => downloadVCard(cardData)}
            className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-zinc-800 text-amber-300 font-bold text-xs border border-amber-500/30"
          >
            <Download className="w-4 h-4" />
            <span>vCard</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="no-print mt-auto border-t border-zinc-800/80 py-6 bg-zinc-950 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-zinc-400">{cardData.name}</span>
            <span>— {cardData.title}</span>
          </div>

          <p className="text-[11px] text-zinc-500">
            Veículo: {cardData.vehicle} • {cardData.coverage} • WhatsApp: {cardData.phone}
          </p>
        </div>
      </footer>
    </div>
  );
}
