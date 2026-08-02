import React, { useState } from 'react';
import { CardData, CardTheme } from '../types';
import { BusinessCardFront } from './BusinessCardFront';
import { BusinessCardBack } from './BusinessCardBack';
import { Printer, LayoutGrid, Check, Sparkles, ArrowLeft } from 'lucide-react';

interface PrintSheetProps {
  data: CardData;
  theme: CardTheme;
  onBackToPreview: () => void;
}

export const PrintSheet: React.FC<PrintSheetProps> = ({
  data,
  theme,
  onBackToPreview,
}) => {
  const [gridCount, setGridCount] = useState<number>(1); // 1 = 1 pair, 5 = 5 pairs (10 cards total)

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Banner & Print Controls (Hidden during print) */}
      <div className="no-print bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-2">
              <Printer className="w-3.5 h-3.5" />
              Pronto para Gráfica ou Impressão Caseira
            </div>
            <h2 className="text-2xl font-black text-white">Layout de Impressão (9x5 cm)</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Proporção padrão gráfica (90mm x 50mm). Você pode imprimir 1 par para teste ou uma folha A4 completa.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToPreview}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Agora (Ctrl + P)</span>
            </button>
          </div>
        </div>

        {/* Quantity Toggle */}
        <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
          <span className="text-xs font-bold text-zinc-400">Quantidade por Folha:</span>
          <button
            onClick={() => setGridCount(1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              gridCount === 1
                ? 'bg-amber-500 text-zinc-950'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            1 Par (Frente + Verso)
          </button>
          <button
            onClick={() => setGridCount(5)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              gridCount === 5
                ? 'bg-amber-500 text-zinc-950'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            Folha A4 Completa (10 Cartões - 5 Frentes / 5 Versos)
          </button>
        </div>
      </div>

      {/* Print Target Area */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-black border border-zinc-300 print:p-0 print:border-none print:shadow-none">
        <div className="text-center mb-6 no-print">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
            --- MARCAS DE CORTE / TAMANHO REAL 9cm x 5cm ---
          </span>
        </div>

        {/* Printable Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-6 print:m-0">
          {Array.from({ length: gridCount }).map((_, index) => (
            <React.Fragment key={index}>
              {/* Front Card Container with Cut Marks */}
              <div className="relative p-2 border border-dashed border-zinc-400 rounded-2xl print:border-solid print:border-zinc-300">
                <span className="absolute -top-3 left-4 bg-white px-2 text-[9px] font-bold text-zinc-500 no-print">
                  Frente #{index + 1}
                </span>
                <BusinessCardFront data={data} theme={theme} />
              </div>

              {/* Back Card Container with Cut Marks */}
              <div className="relative p-2 border border-dashed border-zinc-400 rounded-2xl print:border-solid print:border-zinc-300">
                <span className="absolute -top-3 left-4 bg-white px-2 text-[9px] font-bold text-zinc-500 no-print">
                  Verso #{index + 1}
                </span>
                <BusinessCardBack data={data} theme={theme} />
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-zinc-500 no-print">
          💡 <strong>Dica da Gráfica:</strong> Para impressão profissional, escolha papel couche 300g com laminação fosca e verniz localizado sobre o nome GEAN MARCELL.
        </div>
      </div>
    </div>
  );
};
