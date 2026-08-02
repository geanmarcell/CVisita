export interface CardData {
  name: string;
  title: string;
  tagline: string;
  subtitle: string;
  vehicle: string;
  coverage: string;
  services: string[];
  phone: string;
  whatsappMessage: string;
  paymentMethods: string[];
  pixKey: string;
  pixKeyType: 'cpf' | 'phone' | 'email' | 'random';
  customNote: string;
}

export type CardThemeId = 'sophisticated' | 'carbon' | 'navy' | 'emerald' | 'minimal' | 'obsidian';

export interface CardTheme {
  id: CardThemeId;
  name: string;
  bgGradient: string;
  cardBg: string;
  accent: string;
  accentText: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  badgeBg: string;
  qrFgColor: string;
  qrBgColor: string;
  fontStyle?: 'serif' | 'sans';
}

export type ActiveTab = 'preview' | 'qrcodes' | 'ride' | 'print' | 'tips' | 'edit';
