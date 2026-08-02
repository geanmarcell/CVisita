import React, { useState } from 'react';
import { CardData, CardTheme } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { MessageCircle, UserPlus, CreditCard, Share2, Download, Copy, Check, ExternalLink, Sparkles, Smartphone } from 'lucide-react';
import { getWhatsAppUrl, generateVCard, copyToClipboard } from '../utils/cardUtils';

interface QRCodeSectionProps {
  data: CardData;
  theme: CardTheme;
}

type QRType = 'whatsapp' | 'vcard' | 'pix' | 'link';

export const QRCodeSection: React.FC<QRCodeSectionProps> = ({ data, theme }) => {
  const [activeType, setActiveType] = useState<QRType>('whatsapp');
  const [copied, setCopied] = useState(false);

  const waUrl = getWhatsAppUrl(data.phone, data.whatsappMessage);
  const vcardStr = generateVCard(data);
  const pageUrl = window.location.href;

  const getQRValue = (): string => {
    switch (activeType) {
      case 'whatsapp':
        return waUrl;
      case 'vcard':
        return vcardStr;
      case 'pix':
        return data.pixKey;
      case 'link':
        return pageUrl;
    }
  };

  const getQRTitle = () => {
    switch (activeType) {
      case 'whatsapp':
        return 'QR Code WhatsApp Direct';
      case 'vcard':
        return 'QR Code Salvar Contato (vCard)';
      case 'pix':
        return 'QR Code Chave PIX';
      case 'link':
        return 'QR Code Cartão Digital Web';
    }
  };

  const getQRDescription = () => {
    switch (activeType) {
      case 'whatsapp':
        return 'O passageiro aponta a câmera do celular e abre a conversa no WhatsApp diretamente com mensagem pré-formatada para orçar ou agendar.';
      case 'vcard':
        return 'Ao escanear com a câmera, o celular reconhece o formato de contato (vCard) e sugere salvar "Gean Marcell - Motorista Particular" na agenda com 1 toque.';
      case 'pix':
        return `Exibe a chave PIX (${data.pixKey}). Permite ao passageiro pagar corridas via aplicativo do banco com facilidade.`;
      case 'link':
        return 'Direciona para este cartão de visita interativo na web para que o cliente salve nos favoritos do navegador ou tela inicial.';
    }
  };

  const handleCopyRaw = async () => {
    const val = getQRValue();
    const success = await copyToClipboard(val);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadSVG = () => {
    const svgElement = document.getElementById('main-qr-code-svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `QRCode_GeanMarcell_${activeType}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 p-6 rounded-2xl border border-zinc-700 shadow-xl text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
          <Smartphone className="w-4 h-4" />
          Gerador de QR Code Profissional
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Seus QR Codes de Contato Instantâneo
        </h2>
        <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
          Escolha o tipo de QR Code abaixo para gerar e incluir na versão impressa, no WhatsApp ou exibir no seu celular ao passageiro:
        </p>
      </div>

      {/* QR Code Type Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveType('whatsapp')}
          className={`flex items-center gap-2.5 p-3.5 rounded-xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
            activeType === 'whatsapp'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-900/30'
              : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
          }`}
        >
          <MessageCircle className="w-4 h-4 flex-shrink-0" />
          <div className="text-left leading-tight">
            <div className="font-extrabold">WhatsApp</div>
            <div className="text-[10px] opacity-80">Conversa Direta</div>
          </div>
        </button>

        <button
          onClick={() => setActiveType('vcard')}
          className={`flex items-center gap-2.5 p-3.5 rounded-xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
            activeType === 'vcard'
              ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/30'
              : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
          }`}
        >
          <UserPlus className="w-4 h-4 flex-shrink-0" />
          <div className="text-left leading-tight">
            <div className="font-extrabold">Salvar Contato</div>
            <div className="text-[10px] opacity-80">vCard Agenda</div>
          </div>
        </button>

        <button
          onClick={() => setActiveType('pix')}
          className={`flex items-center gap-2.5 p-3.5 rounded-xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
            activeType === 'pix'
              ? 'bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-900/30'
              : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
          }`}
        >
          <CreditCard className="w-4 h-4 flex-shrink-0" />
          <div className="text-left leading-tight">
            <div className="font-extrabold">Chave PIX</div>
            <div className="text-[10px] opacity-80">Pagamento</div>
          </div>
        </button>

        <button
          onClick={() => setActiveType('link')}
          className={`flex items-center gap-2.5 p-3.5 rounded-xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
            activeType === 'link'
              ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-900/30'
              : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
          }`}
        >
          <Share2 className="w-4 h-4 flex-shrink-0" />
          <div className="text-left leading-tight">
            <div className="font-extrabold">Link Digital</div>
            <div className="text-[10px] opacity-80">Cartão Web</div>
          </div>
        </button>
      </div>

      {/* Main Display Box */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        {/* Left QR Code Container */}
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-2xl border-4 border-zinc-800 space-y-3">
          <QRCodeSVG
            id="main-qr-code-svg"
            value={getQRValue()}
            size={220}
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="H"
            includeMargin={true}
          />
          <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
            Escaneie com a Câmera
          </span>
        </div>

        {/* Right Info and Actions */}
        <div className="flex-1 space-y-5 text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {activeType === 'whatsapp' && '📱 Método recomendado p/ Corridas'}
              {activeType === 'vcard' && '👤 Salvar no Celular do Cliente'}
              {activeType === 'pix' && '💳 Facilidade de Pagamento'}
              {activeType === 'link' && '🌐 Compartilhamento Online'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">{getQRTitle()}</h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {getQRDescription()}
            </p>
          </div>

          {/* Special detail box per type */}
          {activeType === 'pix' && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase block">
                  Chave PIX Cadastrada:
                </span>
                <span className="text-sm font-black text-white font-mono">{data.pixKey}</span>
              </div>
              <button
                onClick={handleCopyRaw}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiada!' : 'Copiar Chave'}</span>
              </button>
            </div>
          )}

          {activeType === 'whatsapp' && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <span className="text-[10px] font-bold text-emerald-300 uppercase block">
                Mensagem Padrão do QR Code:
              </span>
              <p className="text-xs text-emerald-100 italic font-medium">
                "{data.whatsappMessage}"
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleDownloadSVG}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Baixar QR Code (SVG/Imagem)</span>
            </button>

            {activeType === 'whatsapp' && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Testar Link WhatsApp</span>
              </a>
            )}

            <button
              onClick={handleCopyRaw}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs sm:text-sm border border-zinc-700 transition-all active:scale-95 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado!' : 'Copiar Texto do QR Code'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
