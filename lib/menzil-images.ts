/** Mənzil növünə görə plan şəkilləri — photos/ (Adobe Express) → public/photos/ */
export const MENZIL_IMAGES: Record<string, string> = {
  '1 otaqlı': '/photos/adobe-1otaqli.png',
  '2 otaqlı': '/photos/adobe-2otaqli.png',
  '3 otaqlı': '/photos/adobe-3otaqli.png',
  '4 otaqlı': '/photos/adobe-3otaqli.png',
};

export function getMenzilImageUrl(menzilLabel: string | null): string | null {
  if (!menzilLabel?.trim()) return null;
  return MENZIL_IMAGES[menzilLabel.trim()] ?? null;
}
