import React, { useState } from 'react';
import {
  Calculator,
  Fuel,
  MapPin,
  DollarSign,
  TrendingUp,
  Copy,
  Check,
  MessageCircle,
  Navigation,
  Car,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { CardData } from '../types';
import { copyToClipboard, getWhatsAppUrl } from '../utils/cardUtils';

interface AdminDriverCalculatorProps {
  data: CardData;
}

export function AdminDriverCalculator({ data }: AdminDriverCalculatorProps) {
  // Inputs state
  const [distanceKm, setDistanceKm] = useState<number>(50);
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(true);
  const [tollAmount, setTollAmount] = useState<number>(24);
  const [kmPerLiter, setKmPerLiter] = useState<number>(12);
  const [fuelPrice, setFuelPrice] = useState<number>(5.89);
  const [pricePerKm, setPricePerKm] = useState<number>(3.50);
  const [baseFee, setBaseFee] = useState<number>(10.00);
  const [originDestinationText, setOriginDestinationText] = useState<string>('Sorocaba ↔ Aeroporto Viracopos');

  const [copied, setCopied] = useState<boolean>(false);

  // Calculations
  const totalKm = isRoundTrip ? distanceKm * 2 : distanceKm;
  const litersNeeded = totalKm > 0 && kmPerLiter > 0 ? totalKm / kmPerLiter : 0;
  const fuelCost = litersNeeded * fuelPrice;
  const totalDriverCost = fuelCost + tollAmount;

  // Passenger Pricing
  const passengerPriceBeforeToll = (totalKm * pricePerKm) + baseFee;
  const totalPassengerPrice = passengerPriceBeforeToll + tollAmount;

  // Net Profit
  const netProfit = totalPassengerPrice - totalDriverCost;
  const profitMargin = totalPassengerPrice > 0 ? (netProfit / totalPassengerPrice) * 100 : 0;
  const profitPerKm = totalKm > 0 ? netProfit / totalKm : 0;

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getProposalText = () => {
    return `🚗 *ORÇAMENTO DE CORRIDA PARTICULAR*
*Motorista:* ${data.name} (${data.vehicle})

📍 *Trajeto:* ${originDestinationText || 'Conforme solicitado'}
🛣️ *Distância:* ${distanceKm} km ${isRoundTrip ? '(Ida e Volta - Total ' + totalKm + ' km)' : '(Somente Ida)'}
🛣️ *Pedágios inclusos:* ${formatCurrency(tollAmount)}

💳 *VALOR TOTAL DA VIAGEM:* ${formatCurrency(totalPassengerPrice)}

✅ *Incluso:*
• Atendimento exclusivo e horário agendado
• Ar-condicionado, água e conforto
• Bagagens acomodadas com segurança
• Pagamento via PIX ou Cartão

📲 Aguardo sua confirmação para garantir a reserva na agenda!`;
  };

  const handleCopyProposal = async () => {
    const text = getProposalText();
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSendWhatsAppProposal = () => {
    const text = getProposalText();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 text-left animate-fade-in">
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-amber-950/40 to-zinc-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Ferramenta Exclusiva do Motorista (Admin)
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-black">
            Autonomia {kmPerLiter} km/L • R$ {fuelPrice.toFixed(2)}/L
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
          Calculadora Interna de Custos e Lucro
        </h2>
        <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed">
          Calcule rapidamente seus gastos com combustível e pedágio, defina a tarifa por KM e saiba exatamente o seu lucro líquido antes de fechar a corrida com o passageiro.
        </p>
      </div>

      {/* Main Grid: Left Inputs / Right Metrics & Proposal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Inputs Form (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Calculator className="w-5 h-5 text-amber-400" />
            Parâmetros da Corrida
          </h3>

          {/* Route details */}
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-zinc-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              Descrição do Trajeto / Cidades
            </label>
            <input
              type="text"
              value={originDestinationText}
              onChange={(e) => setOriginDestinationText(e.target.value)}
              placeholder="Ex: Sorocaba até Guarulhos"
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm sm:text-base focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Distance and Roundtrip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-zinc-200 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-sky-400" />
                KM de Ida (Distância)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={distanceKm || ''}
                  onChange={(e) => setDistanceKm(parseFloat(e.target.value) || 0)}
                  placeholder="Ex: 50"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-base font-bold focus:outline-none focus:border-amber-400 pr-12"
                />
                <span className="absolute right-3.5 top-3.5 text-xs font-bold text-zinc-400">KM</span>
              </div>
            </div>

            <div className="space-y-1.5 flex flex-col justify-end">
              <div className="p-3.5 rounded-xl bg-zinc-800/80 border border-zinc-700/80 flex items-center gap-3 cursor-pointer" onClick={() => setIsRoundTrip(!isRoundTrip)}>
                <input
                  type="checkbox"
                  id="adminRoundTrip"
                  checked={isRoundTrip}
                  onChange={(e) => setIsRoundTrip(e.target.checked)}
                  className="w-5 h-5 rounded text-amber-500 bg-zinc-900 border-zinc-700 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="adminRoundTrip" className="text-xs sm:text-sm font-bold text-white cursor-pointer select-none">
                  Ida e Volta ({isRoundTrip ? totalKm + ' KM Total' : 'Somente Ida'})
                </label>
              </div>
            </div>
          </div>

          {/* Tolls and Price per KM */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-zinc-200 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Valor Total do Pedágio (R$)
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={tollAmount}
                onChange={(e) => setTollAmount(parseFloat(e.target.value) || 0)}
                placeholder="Ex: 24.00"
                className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-base font-bold focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-zinc-200 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                Valor Cobrado por KM (R$/KM)
              </label>
              <input
                type="number"
                min="0.5"
                step="0.1"
                value={pricePerKm}
                onChange={(e) => setPricePerKm(parseFloat(e.target.value) || 0)}
                placeholder="Ex: 3.50"
                className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-base font-bold focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Fuel Settings & Base fee */}
          <div className="pt-2 border-t border-zinc-800 space-y-4">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Fuel className="w-4 h-4" /> Configuração de Combustível ({data.vehicle})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-300">Autonomia (KM / Litro)</label>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={kmPerLiter}
                  onChange={(e) => setKmPerLiter(parseFloat(e.target.value) || 1)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm font-medium focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-300">Combustível (R$ / Litro)</label>
                <input
                  type="number"
                  min="1"
                  step="0.05"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm font-medium focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-300">Bandeirada / Taxa Fixo (R$)</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={baseFee}
                  onChange={(e) => setBaseFee(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm font-medium focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Financial Results Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-5 flex flex-col">
          {/* Results Summary Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5 shadow-2xl flex-1">
            <h3 className="text-lg font-black text-white flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                Resumo do Cálculo
              </span>
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase">
                {totalKm} KM TOTAL
              </span>
            </h3>

            {/* Top Stat Boxes */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-left">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Gasto de Combustível</span>
                <span className="text-lg font-black text-red-400">{formatCurrency(fuelCost)}</span>
                <span className="text-[10px] text-zinc-500 block">({litersNeeded.toFixed(1)} Litros)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-left">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Custo Total Motorista</span>
                <span className="text-lg font-black text-amber-400">{formatCurrency(totalDriverCost)}</span>
                <span className="text-[10px] text-zinc-500 block">(Combustível + Pedágio)</span>
              </div>
            </div>

            {/* Total Charged to Customer */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-500/40 space-y-1 text-left">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Valor Total Cobrado do Cliente:
              </span>
              <div className="text-3xl font-black text-white tracking-tight">
                {formatCurrency(totalPassengerPrice)}
              </div>
              <p className="text-[11px] text-zinc-400">
                {totalKm} km x R$ {pricePerKm.toFixed(2)}/km {baseFee > 0 ? `+ R$ ${baseFee} taxa` : ''} + R$ {tollAmount.toFixed(2)} pedágio
              </p>
            </div>

            {/* Net Profit Big Highlight */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 space-y-1 text-left shadow-lg shadow-amber-500/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-zinc-900">
                  Seu Lucro Líquido Real:
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-950 text-amber-300 font-extrabold text-xs">
                  {profitMargin.toFixed(1)}% Margem
                </span>
              </div>
              <div className="text-3xl font-black tracking-tight text-zinc-950">
                {formatCurrency(netProfit)}
              </div>
              <p className="text-xs font-bold text-zinc-900/80">
                Ganho limpo de {formatCurrency(profitPerKm)} por KM rodado no seu bolso!
              </p>
            </div>

            {/* Quick Proposal Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleSendWhatsAppProposal}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Enviar Proposta via WhatsApp</span>
              </button>

              <button
                onClick={handleCopyProposal}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs border border-zinc-700 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Proposta Copiada!' : 'Copiar Texto da Proposta'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
