export const CONTACT_PHONE = '+994554401030';
export const CONTACT_PHONE_TEL = 'tel:+994554401030';

export const DEFAULT_MESSAGE = 'Bu mənzil haqqında maraqlanmaq istərdim';

export function whatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message || DEFAULT_MESSAGE);
  return `https://wa.me/994554401030?text=${text}`;
}

export function whatsAppUrlForMenzil(menzilLabel: string | null): string {
  const message = menzilLabel
    ? `${DEFAULT_MESSAGE} (${menzilLabel}).`
    : DEFAULT_MESSAGE;
  return whatsAppUrl(message);
}
