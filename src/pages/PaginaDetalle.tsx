import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { obtenerPrecios } from '../services/coingecko'
import { MONEDAS } from '../data/monedas'
import type { Criptomoneda, FaseConsulta } from '../types'
import EstadoConsulta from '../components/EstadoConsulta'
import { formatearUSD } from '../utils/formato'
import BotonFavorito from '../components/BotonFavorito'
function PaginaDetalle() {
  // 1. Lee el id desde la URL: /criptomonedas/:id
  const { id } = useParams()

  // 2. Comprueba que sea una moneda admitida por la app
  const info = MONEDAS.find((m) => m.id === id)

  const [moneda, setMoneda] = useState<Criptomoneda | null>(null)
  const [fase, setFase] = useState<FaseConsulta>('carga')
  const [intento, setIntento] = useState(0)

  // 3. Pide los datos a la API (funciona aunque se recargue la página)
   useEffect(() => {
    if (!info) return
    const controlador = new AbortController()   // permite CANCELAR la solicitud

    obtenerPrecios(controlador.signal)
      .then((datos) => {
        setMoneda(datos.find((m) => m.id === info.id) ?? null)
        setFase('exito')
      })
      .catch(() => {
        if (controlador.signal.aborted) return   // fue cancelada a propósito: no es un error
        setFase('error')
      })

    return () => controlador.abort()   // al desmontar, cancela la solicitud en curso
  }, [info, intento])
  function reintentar() {
    setFase('carga')
    setIntento((anterior) => anterior + 1)
  }

  // 4. Si el id no existe, lo informa
  if (!info) {
    return (
      <section>
        <h2>Moneda no encontrada</h2>
        <p>⚠️ La criptomoneda “{id}” no existe en Pulso Abierto.</p>
        <Link to="/">← Volver al listado</Link>
      </section>
    )
  }

  return (
    <section>
      <Link to="/">← Volver al listado</Link>
      <h2>
        {info.nombre} <span className="simbolo">{info.simbolo}</span>
      </h2>
            <BotonFavorito id={info.id} nombre={info.nombre} />

      {fase === 'exito' && moneda ? (
        <dl className="detalle">
          <dt>Precio actual</dt>
          <dd className="precio">{formatearUSD(moneda.precioUsd)}</dd>
          <dt>Símbolo</dt>
          <dd>{moneda.simbolo}</dd>
          <dt>Identificador en CoinGecko</dt>
          <dd>{moneda.id}</dd>
        </dl>
      ) : (
        <EstadoConsulta fase={fase} cantidad={moneda ? 1 : 0} onReintentar={reintentar} />
      )}
    </section>
  )
}

export default PaginaDetalle