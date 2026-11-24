import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import TarjetaMoneda from '../components/TarjetaMoneda'
import PaginaInicio from '../pages/PaginaInicio'
import { useFavoritos } from '../store/favoritos'

const PRECIOS = { bitcoin: { usd: 60000 }, ethereum: { usd: 3000 }, solana: { usd: 150 } }

function simularFetch(ok: boolean, status: number, cuerpo: unknown) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok, status, json: async () => cuerpo }))
}

beforeEach(() => {
  useFavoritos.setState({ favoritos: [] }) // cada prueba empieza sin favoritos
  localStorage.clear()
})

afterEach(() => vi.unstubAllGlobals())

// A. FAVORITOS
describe('Favoritos', () => {
  it('permite marcar y desmarcar una criptomoneda', async () => {
    const usuario = userEvent.setup()
    render(
      <MemoryRouter>
        <TarjetaMoneda moneda={{ id: 'bitcoin', nombre: 'Bitcoin', simbolo: 'BTC', precioUsd: 60000 }} />
      </MemoryRouter>,
    )

    const boton = screen.getByRole('button', { name: 'Favorito: Bitcoin' })
    expect(boton).toHaveAttribute('aria-pressed', 'false')

    await usuario.click(boton)
    expect(boton).toHaveAttribute('aria-pressed', 'true')
    expect(boton).toHaveTextContent('★ Favorito')

    await usuario.click(boton)
    expect(boton).toHaveAttribute('aria-pressed', 'false')
  })
})

// B. CONSULTA: carga seguida de resultado
describe('Consulta de datos', () => {
  it('muestra la carga y después los resultados', async () => {
    let responder!: (valor: unknown) => void
    vi.stubGlobal('fetch', vi.fn(() => new Promise((r) => { responder = r })))
    const usuario = userEvent.setup()
    render(<MemoryRouter><PaginaInicio /></MemoryRouter>)

    await usuario.click(screen.getByRole('button', { name: 'Consultar precios' }))
    expect(screen.getByRole('status')).toHaveTextContent('Cargando')

    responder({ ok: true, status: 200, json: async () => PRECIOS })

    expect(await screen.findByText(/Consulta completada: 3 resultados/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Bitcoin/ })).toBeInTheDocument()
  })
})

// C. ERROR Y RECUPERACIÓN
describe('Error y reintento', () => {
  it('muestra un error con reintento y se recupera', async () => {
    simularFetch(false, 500, {})
    const usuario = userEvent.setup()
    render(<MemoryRouter><PaginaInicio /></MemoryRouter>)

    await usuario.click(screen.getByRole('button', { name: 'Consultar precios' }))

    const reintentar = await screen.findByRole('button', { name: 'Volver a intentar' })
    expect(screen.getByRole('status')).toHaveTextContent('no se pudo completar la consulta')

    simularFetch(true, 200, PRECIOS)
    await usuario.click(reintentar)

    expect(await screen.findByText(/Consulta completada: 3 resultados/)).toBeInTheDocument()
  })
})