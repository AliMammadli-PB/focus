/** Mənzil növünə görə plan şəkilləri — public/photos/ qovluğuna bu faylları kopyalayın */
export const MENZIL_IMAGES: Record<string, string> = {
  '1 otaqlı': '/photos/png-clipart-apartment-3d-floor-plan-house-plan-apartment-building-apartment.png',
  '2 otaqlı': '/photos/png-transparent-home-floor-plan-apartment-renting-house-home-furniture-building-interior-design.png',
  '3 otaqlı': '/photos/kisspng-parkway-terraces-premier-apartment-residences-floo-sable-island-5b1c85232abb38.021912091528595747175.jpg',
  '4 otaqlı': '/photos/kisspng-parkway-terraces-premier-apartment-residences-floo-sable-island-5b1c85232abb38.021912091528595747175.jpg',
};

export function getMenzilImageUrl(menzilLabel: string | null): string | null {
  if (!menzilLabel?.trim()) return null;
  return MENZIL_IMAGES[menzilLabel.trim()] ?? null;
}
