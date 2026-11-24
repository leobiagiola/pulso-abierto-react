const formatoUSD = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD' })

// Convierte un número a dólares: 62253 → "US$ 62.253,00"
export function formatearUSD(valor: number): string {
  return formatoUSD.format(valor)
}