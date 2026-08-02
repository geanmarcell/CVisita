import { CardData } from '../types';

export function sanitizePhone(phone: string): string {
  // Extract numbers
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10 || cleaned.length === 11) {
    return '55' + cleaned;
  }
  return cleaned;
}

export function getWhatsAppUrl(phone: string, message?: string): string {
  const cleanNum = sanitizePhone(phone);
  const encodedMsg = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${cleanNum}${encodedMsg ? `?text=${encodedMsg}` : ''}`;
}

export function generateVCard(data: CardData): string {
  const cleanNum = sanitizePhone(data.phone);
  const noteText = `Motorista Particular - ${data.vehicle}. ${data.tagline}. Atendimento: ${data.coverage}. Services: ${data.services.join(', ')}`;
  
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${data.name} - ${data.title}`,
    `N:;${data.name};;;`,
    `TITLE:${data.title}`,
    `ORG:${data.coverage}`,
    `TEL;TYPE=CELL,VOICE,PREF:+${cleanNum}`,
    `NOTE:${noteText}`,
    'END:VCARD'
  ].join('\r\n');
}

export function downloadVCard(data: CardData) {
  const vcardContent = generateVCard(data);
  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${data.name.replace(/\s+/g, '_')}_Motorista.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy', err);
    return false;
  }
}
