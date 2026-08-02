import React, { useState } from 'react';
import { CardData } from '../types';
import { Lightbulb, MessageSquare, Smartphone, Shield, Target, Copy, Check, Sparkles, Send } from 'lucide-react';
import { copyToClipboard, getWhatsAppUrl } from '../utils/cardUtils';

interface TipsSectionProps {
  data: CardData;
}

export const TipsSection: React.FC<TipsSectionProps> = ({ data }) => {
  const [copiedScript, setCopiedScript] = useState<number | null>(null);

  const scripts = [
    {
      title: 'Mensagem de Agradecimento Pós-Corrida (WhatsApp)',
      description: 'Envie para passageiros que elogiaram a corrida ou o carro durante o trajeto.',
      text: `Olá! Aqui é o Gean, seu motorista do Fiat Argo. Foi um prazer realizar sua corrida hoje! 🚘\n\nCaso precise de motorista particular para compromissos, viagens ou aeroportos em Sorocaba e região, estou à disposição com horário agendado.\n\nGuarde meu contato: ${data.phone}\nTenha um ótimo dia!`
    },
    {
      title: 'Frase Simpática para Deixar no Carro',
      description: 'Texto para colocar junto aos cartões impressos no console central ou porta-revistas do banco.',
      text: `\"Precisando de um motorista de confiança com hora marcada para sua próxima viagem, compromisso ou aeroporto? É só chamar o Gean no WhatsApp: ${data.phone}!\"`
    },
    {
      title: 'Orçamento Rápido para Aeroportos (GRU / VCP / CGH)',
      description: 'Modelo de resposta para quem pergunta valor de corrida até aeroporto.',
      text: `Olá! Faço viagens particulares para Viracopos (VCP), Cumbica (GRU) e Congonhas (CGH) com conforto, pontualidade e mala abastecida com água e carregadores.\n\nQual a data e horário do seu voo para eu passar o orçamento promocional?`
    }
  ];

  const handleCopyScript = async (text: string, index: number) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedScript(index);
      setTimeout(() => setCopiedScript(null), 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 text-left">
      {/* Main Title Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-zinc-900 to-zinc-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          Guia Prático de Fidelização de Passageiros
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Como Conquistar Clientes Regulares "Por Fora"
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Estratégias comprovadas para transformar corridas de aplicativo em clientes fixos de viagens particulares, aeroportos e compromissos em Sorocaba e região.
        </p>
      </div>

      {/* Grid of Key Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tip 1 */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">1. Cartão Digital no Celular</h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Sempre que um passageiro elogiar a limpeza do seu Fiat Argo, a pontualidade ou a música, diga: <i>"Trabalho também com agendamento particular para viagens e aeroportos. Posso te enviar meu cartão no WhatsApp?"</i>
          </p>
        </div>

        {/* Tip 2 */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">2. Abordagem Natural no Veículo</h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Deixe 3 ou 4 cartões impressos no console central ou no bolso de trás do banco do passageiro. Apenas mencione de forma simpática e deixe que o cliente pegue o cartão voluntariamente.
          </p>
        </div>

        {/* Tip 3 */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">3. Chave PIX Rápida e Transparência</h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Tenha sua chave PIX (<span className="text-amber-400 font-mono font-bold">{data.pixKey}</span>) na ponta da língua ou exibida no QR code do verso do cartão. Transmite profissionalismo e elimina barreiras no pagamento.
          </p>
        </div>

        {/* Tip 4 */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">4. Nichos Mais Lucrativos</h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Foque em corridas para aeroportos (Viracopos, Guarulhos, Congonhas), médicos/consultas, eventos noturnos, casamentos e executivos em Sorocaba que precisam de retorno garantido sem sustos.
          </p>
        </div>
      </div>

      {/* Ready-to-use Scripts Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amber-400" />
          Modelos de Mensagens Prontas para Enviar aos Clientes
        </h3>

        <div className="space-y-4">
          {scripts.map((script, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-amber-300 text-sm">{script.title}</h4>
                  <p className="text-xs text-zinc-400">{script.description}</p>
                </div>
                <button
                  onClick={() => handleCopyScript(script.text, idx)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-auto"
                >
                  {copiedScript === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedScript === idx ? 'Copiado!' : 'Copiar Texto'}</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 font-mono text-xs text-zinc-300 whitespace-pre-wrap border border-zinc-800 leading-relaxed">
                {script.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
