import type { MonedaId } from '../types'

export const MONEDAS: { id: MonedaId; nombre: string; simbolo: string }[] = [
  { id: 'bitcoin', nombre: 'Bitcoin', simbolo: 'BTC' },
  { id: 'ethereum', nombre: 'Ethereum', simbolo: 'ETH' },
  { id: 'solana', nombre: 'Solana', simbolo: 'SOL' },
]