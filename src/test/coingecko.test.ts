import { afterEach, describe, expect, it, vi } from 'vitest'
import { obtenerPrecios } from '../services/coingecko'

// Reemplaza fetch por uno FALSO: no se llama a CoinGecko de verdad
function simularFetch(ok: boolean, status: number, cuerpo: unknown) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok, status, json: async () => cuerpo }))
}

afterEach(() => vi.unstubAllGlobals())

describe('obtenerPrecios', () => {
  it('con respuesta exitosa devuelve los datos transformados', async () => {
    simularFetch(true, 200, {
      bitcoin: { usd: 60000 },
      ethereum: { usd: 3000 },
      solana: { usd: 150 },
    })

    const resultado = await obtenerPrecios()

    expect(resultado).toEqual([
      { id: 'bitcoin', nombre: 'Bitcoin', simbolo: 'BTC', precioUsd: 60000 },
      { id: 'ethereum', nombre: 'Ethereum', simbolo: 'ETH', precioUsd: 3000 },
      { id: 'solana', nombre: 'Solana', simbolo: 'SOL', precioUsd: 150 },
    ])
  })

  it('con ok: false lanza un error', async () => {
    simularFetch(false, 500, {})

    await expect(obtenerPrecios()).rejects.toThrow('500')
  })
})