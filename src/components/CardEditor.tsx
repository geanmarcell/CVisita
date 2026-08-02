import React from 'react';
import { CardData, CardThemeId } from '../types';
import { themes } from '../data/defaults';
import { Sliders, Palette, RefreshCw, Save, Check } from 'lucide-react';

interface CardEditorProps {
  data: CardData;
  onChange: (updated: CardData) => void;
  activeThemeId: CardThemeId;
  onThemeChange: (themeId: CardThemeId) => void;
  onReset: () => void;
}

export const CardEditor: React.FC<CardEditorProps> = ({
  data,
  onChange,
  activeThemeId,
  onThemeChange,
  onReset,
}) => {
  const handleChange = (field: keyof CardData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleServiceChange = (index: number, val: string) => {
    const newServices = [...data.services];
    newServices[index] = val;
    onChange({ ...data, services: newServices });
  };

  const addService = () => {
    onChange({ ...data, services: [...data.services, 'Novo Serviço'] });
  };

  const removeService = (index: number) => {
    onChange({ ...data, services: data.services.filter((_, i) => i !== index) });
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-10 space-y-10 text-left shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
            <Sliders className="w-4 h-4" />
            Personalizador em Tempo Real
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">Editar Dados e Estilo do Cartão</h2>
          <p className="text-xs sm:text-sm md:text-base text-zinc-300 mt-1">
            Altere os dados abaixo para ver o cartão de visita atualizar instantaneamente.
          </p>
        </div>

        <button
          onClick={onReset}
          className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-extrabold text-xs sm:text-sm md:text-base flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto border border-zinc-700"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Restaurar Padrão</span>
        </button>
      </div>

      {/* Theme Selector Section */}
      <div className="space-y-4">
        <label className="text-xs sm:text-sm md:text-base font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Estilo Visual & Tema de Cores
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          {Object.values(themes).map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t.id as CardThemeId)}
              className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold transition-all text-left flex flex-col justify-between h-24 cursor-pointer ${
                activeThemeId === t.id
                  ? 'border-amber-400 bg-amber-500/10 text-amber-300 shadow-lg'
                  : 'border-zinc-800 bg-zinc-950/80 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="truncate font-extrabold">{t.name.split(' ')[0]}</span>
                {activeThemeId === t.id && <Check className="w-4 h-4 text-amber-400" />}
              </div>
              <div className="flex items-center gap-2 mt-auto">
                <div className="w-4 h-4 rounded-full bg-zinc-950 border border-zinc-700" />
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: t.accent }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Basic Info Fields */}
      <div className="space-y-5 pt-6 border-t border-zinc-800">
        <h3 className="text-base sm:text-lg md:text-xl font-black text-white uppercase tracking-wider">
          Informações da Frente (Destaque)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm md:text-base font-bold text-zinc-200">Nome Completo / Marca</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm sm:text-base md:text-lg focus:outline-none focus:border-amber-400 font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm md:text-base font-bold text-zinc-200">Cargo / Título</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm sm:text-base md:text-lg focus:outline-none focus:border-amber-400 font-medium"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs sm:text-sm md:text-base font-bold text-zinc-200">Frase Principal (Tagline)</label>
          <input
            type="text"
            value={data.tagline}
            onChange={(e) => handleChange('tagline', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm sm:text-base md:text-lg focus:outline-none focus:border-amber-400 font-medium"
          />
        </div>
      </div>

      {/* Back Side Info Fields */}
      <div className="space-y-5 pt-6 border-t border-zinc-800">
        <h3 className="text-base sm:text-lg md:text-xl font-black text-white uppercase tracking-wider">
          Informações do Verso (Contatos & Veículo)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm md:text-base font-bold text-zinc-200">Veículo Oficial (Modelo/Ano)</label>
            <input
              type="text"
              value={data.vehicle}
              onChange={(e) => handleChange('vehicle', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm sm:text-base md:text-lg focus:outline-none focus:border-amber-400 font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm md:text-base font-bold text-zinc-200">Região de Atendimento</label>
            <input
              type="text"
              value={data.coverage}
              onChange={(e) => handleChange('coverage', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm sm:text-base md:text-lg focus:outline-none focus:border-amber-400 font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm md:text-base font-bold text-zinc-200">Telefone / WhatsApp</label>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm sm:text-base md:text-lg focus:outline-none focus:border-amber-400 font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm md:text-base font-bold text-zinc-200">Chave PIX (para pagamentos)</label>
            <input
              type="text"
              value={data.pixKey}
              onChange={(e) => handleChange('pixKey', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm sm:text-base md:text-lg focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>
        </div>

        {/* Services Manager */}
        <div className="space-y-3 pt-3">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm md:text-base font-bold text-zinc-200">Lista de Serviços Oferecidos</label>
            <button
              onClick={addService}
              className="text-xs sm:text-sm md:text-base font-extrabold text-amber-400 hover:underline cursor-pointer"
            >
              + Adicionar Serviço
            </button>
          </div>
          <div className="space-y-2.5">
            {data.services.map((service, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => handleServiceChange(idx, e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm sm:text-base md:text-lg focus:outline-none focus:border-amber-400"
                />
                {data.services.length > 1 && (
                  <button
                    onClick={() => removeService(idx)}
                    className="p-3 text-zinc-400 hover:text-red-400 rounded-xl hover:bg-zinc-800 text-xl font-bold cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
