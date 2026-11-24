import type { Criptomoneda, RespuestaPrecios } from '../types'
import { MONEDAS } from '../data/monedas'

const URL_BASE = 'https://api.coingecko.com/api/v3/simple/price'

// Pide los precios y los devuelve listos para usar en la app
export async function obtenerPrecios(signal?: AbortSignal): Promise<Criptomoneda[]> {
  const ids = MONEDAS.map((moneda) => moneda.id).join(',')
  const respuesta = await fetch(`${URL_BASE}?ids=${ids}&vs_currencies=usd`, { signal })

  if (!respuesta.ok) {
    throw new Error(`El servicio respondió con error ${respuesta.status}`)
  }

  const datos: RespuestaPrecios = await respuesta.json()

  // Transforma la respuesta de la API al formato de la app
  const resultado: Criptomoneda[] = []
  for (const moneda of MONEDAS) {
    const info = datos[moneda.id]
    if (info) {
      resultado.push({ ...moneda, precioUsd: info.usd })
    }
  }
  return resultado
}