export const MENZILLER = [
  { slug: '1-otaqli', label: '1 otaqlı', rooms: 1, price: 220_000, area: '42–48 m²', desc: 'Smart sistemlər, açıq məkan' },
  { slug: '2-otaqli', label: '2 otaqlı', rooms: 2, price: 380_000, area: '68–78 m²', desc: 'Geniş yaşayış, tam təchizat' },
  { slug: '3-otaqli', label: '3 otaqlı', rooms: 3, price: 520_000, area: '95–108 m²', desc: 'Ailə üçün ideal məkan' },
  { slug: '4-otaqli', label: '4 otaqlı', rooms: 4, price: 680_000, area: '125–140 m²', desc: 'Premium yaşayış' },
] as const;

export function formatPrice(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function getMenzilBySlug(slug: string) {
  return MENZILLER.find((m) => m.slug === slug) ?? null;
}
