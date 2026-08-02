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
    <div className="w-full max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-8 text-left shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5" />
            Personalizador em Tempo Real
          </div>
          <h2 className="text-2xl font-black text-white">Editar Dados e Estilo do Cartão</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Altere os dados abaixo para ver o cartão de visita atualizar instantaneamente.
          </p>
        </div>

        <button
          onClick={onReset}
          className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Restaurar Padrão</span>
        </button>
      </div>

      {/* Theme Selector Section */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Estilo Visual & Tema de Cores
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {Object.values(themes).map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t.id as CardThemeId)}
              className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between h-20 cursor-pointer ${
                activeThemeId === t.id
                  ? 'border-amber-400 bg-amber-500/10 text-amber-300 shadow-lg'
                  : 'border-zinc-800 bg-zinc-950/80 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="truncate">{t.name.split(' ')[0]}</span>
                {activeThemeId === t.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </div>
              <div className="flex items-center gap-1.5 mt-auto">
                <div className="w-3.5 h-3.5 rounded-full bg-zinc-950 border border-zinc-700" />
                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: t.accent }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Basic Info Fields */}
      <div className="space-y-4 pt-4 border-t border-zinc-800">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Informações da Frente (Destaque)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-300">Nome Completo / Marca</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-300">Cargo / Título</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-zinc-300">Frase Principal (Tagline)</label>
          <input
            type="text"
            value={data.tagline}
            onChange={(e) => handleChange('tagline', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Back Side Info Fields */}
      <div className="space-y-4 pt-4 border-t border-zinc-800">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Informações do Verso (Contatos & Veículo)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-300">Veículo Oficial (Modelo/Ano)</label>
            <input
              type="text"
              value={data.vehicle}
              onChange={(e) => handleChange('vehicle', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-300">Região de Atendimento</label>
            <input
              type="text"
              value={data.coverage}
              onChange={(e) => handleChange('coverage', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-300">Telefone / WhatsApp</label>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-300">Chave PIX (para pagamentos)</label>
            <input
              type="text"
              value={data.pixKey}
              onChange={(e) => handleChange('pixKey', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>
        </div>

        {/* Services Manager */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-zinc-300">Lista de Serviços Oferecidos</label>
            <button
              onClick={addService}
              className="text-xs font-bold text-amber-400 hover:underline cursor-pointer"
            >
              + Adicionar Serviço
            </button>
          </div>
          <div className="space-y-2">
            {data.services.map((service, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => handleServiceChange(idx, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
                {data.services.length > 1 && (
                  <button
                    onClick={() => removeService(idx)}
                    className="p-2 text-zinc-500 hover:text-red-400 rounded-lg hover:bg-zinc-800 cursor-pointer"
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
