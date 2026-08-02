import React, { useState } from 'react';
import { CardData } from '../types';
import { MapPin, Calendar, Clock, Users, Send, X, Car, MessageCircle, Sparkles } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/cardUtils';

interface RideCalculatorModalProps {
  data: CardData;
  isOpen: boolean;
  onClose: () => void;
}

export const RideCalculatorModal: React.FC<RideCalculatorModalProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const [origin, setOrigin] = useState('Sorocaba (Centro / Bairro)');
  const [destination, setDestination] = useState('Aeroporto de Viracopos (VCP)');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSendWhatsApp = () => {
    const formattedMsg = `🚗 *SOLICITAÇÃO DE CORRIDA PARTICULAR*\n*Motorista:* ${data.name}\n----------------------------\n📍 *Origem:* ${origin || 'Não informada'}\n🏁 *Destino:* ${destination || 'Não informado'}\n📅 *Data:* ${date || 'A combinar'} ${time ? `às ${time}` : ''}\n👥 *Passageiros:* ${passengers} pessoa(s)\n🔄 *Ida e Volta:* ${isRoundTrip ? 'Sim' : 'Apenas Ida'}${notes ? `\n📝 *Obs:* ${notes}` : ''}\n----------------------------\nOlá Gean, gostaria de verificar a disponibilidade e o valor estimado para esta viagem!`;

    const url = getWhatsAppUrl(data.phone, formattedMsg);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Solicitar Orçamento no WhatsApp</h3>
              <p className="text-xs text-zinc-400">Preencha os dados da corrida para enviar ao Gean</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-left">
          {/* Origin */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Local de Partida (Origem)
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Ex: Bairro Campolim - Sorocaba"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Destination */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Destino
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Ex: Aeroporto Viracopos / São Paulo"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                Data Pretendida
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                Horário
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          {/* Passengers & Roundtrip */}
          <div className="grid grid-cols-2 gap-3 items-center">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                Nº Passageiros
              </label>
              <select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:outline-none focus:border-purple-400"
              >
                <option value="1">1 Pessoa</option>
                <option value="2">2 Pessoas</option>
                <option value="3">3 Pessoas</option>
                <option value="4">4 Pessoas (Lotação Máxima)</option>
              </select>
            </div>

            <div className="pt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="roundtrip"
                checked={isRoundTrip}
                onChange={(e) => setIsRoundTrip(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 bg-zinc-800 border-zinc-700 focus:ring-0"
              />
              <label htmlFor="roundtrip" className="text-xs font-bold text-zinc-300 cursor-pointer">
                Incluir Ida e Volta
              </label>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-300">
              Observações / Bagagens / Voo
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: 2 malas grandes, voo das 10h, etc."
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-500"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={handleSendWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enviar no WhatsApp do Gean</span>
          </button>
        </div>
      </div>
    </div>
  );
};
