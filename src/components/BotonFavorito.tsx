import { useFavoritos } from '../store/favoritos'
import type { MonedaId } from '../types'

interface Props {
  id: MonedaId
  nombre: string
}

function BotonFavorito({ id, nombre }: Props) {
  // SELECTORES: cada uno pide solo lo que necesita
  const esFavorito = useFavoritos((estado) => estado.favoritos.includes(id))
  const alternarFavorito = useFavoritos((estado) => estado.alternarFavorito)

  return (
    <button
      type="button"
      className="btn-destacar"
      aria-pressed={esFavorito}
      aria-label={`Favorito: ${nombre}`}
      onClick={() => alternarFavorito(id)}
    >
      {esFavorito ? '★ Favorito' : '☆ Favorito'}
    </button>
  )
}

export default BotonFavorito