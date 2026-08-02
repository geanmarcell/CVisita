import React, { useState } from 'react';
import { Lock, X, ShieldCheck, AlertCircle, KeyRound, User } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminLoginModal({ isOpen, onClose, onSuccess }: AdminLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Credentials strictly check
    if (username.trim() === 'Admin' && password === 'Gean@246855') {
      onSuccess();
      setUsername('');
      setPassword('');
      onClose();
    } else {
      setError('Usuário ou senha incorretos. Acesso restrito ao motorista.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-zinc-900 via-amber-950/40 to-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Área do Motorista</h3>
              <p className="text-xs text-zinc-400">Acesso Administrativo do Gean</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-center gap-2.5 font-medium">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-zinc-200 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              Usuário
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-zinc-200 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-amber-400" />
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs sm:text-sm cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Entrar como Admin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
