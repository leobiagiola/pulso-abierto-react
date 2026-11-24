// Los ids de las monedas que acepta la app
export type MonedaId = 'bitcoin' | 'ethereum' | 'solana'

// Lo que devuelve la API (igual que en la Actividad 1)
export interface PrecioUSD {
  usd: number
}

export interface RespuestaPrecios {
  bitcoin?: PrecioUSD
  ethereum?: PrecioUSD
  solana?: PrecioUSD
}

// Lo que usa la APP (más cómodo para mostrar)
export interface Criptomoneda {
  id: MonedaId
  nombre: string
  simbolo: string
  precioUsd: number
}// En qué momento está la consulta
export type FaseConsulta = 'inicial' | 'carga' | 'exito' | 'error'
// Criterios del formulario
export type Orden = 'nombre' | 'mayor' | 'menor'

export interface Criterios {
  busqueda: string
  orden: Orden
}