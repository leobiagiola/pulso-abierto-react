import { Link } from 'react-router-dom'
import type { Criptomoneda } from '../types'
import { formatearUSD } from '../utils/formato'
import { useFavoritos } from '../store/favoritos'
import BotonFavorito from './BotonFavorito'

interface Props {
  moneda: Criptomoneda
}

function TarjetaMoneda({ moneda }: Props) {
  const esFavorito = useFavoritos((estado) => estado.favoritos.includes(moneda.id))

  return (
    <article className={esFavorito ? 'tarjeta destacada' : 'tarjeta'}>
      <h3>
        {moneda.nombre} <span>{moneda.simbolo}</span>
      </h3>
      <p className="precio">{formatearUSD(moneda.precioUsd)}</p>

      <div className="acciones">
        <Link to={`/criptomonedas/${moneda.id}`}>Ver detalle</Link>
        <BotonFavorito id={moneda.id} nombre={moneda.nombre} />
      </div>
    </article>
  )
}

export default TarjetaMoneda
