import type { Criptomoneda } from '../types'
import TarjetaMoneda from './TarjetaMoneda'

interface Props {
  monedas: Criptomoneda[]
}

function ListaResultados({ monedas }: Props) {
  return (
    <ul id="lista-resultados">
      {monedas.map((moneda) => (
        <li key={moneda.id}>
          <TarjetaMoneda moneda={moneda} />
        </li>
      ))}
    </ul>
  )
}

export default ListaResultados