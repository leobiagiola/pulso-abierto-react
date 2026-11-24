import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MonedaId } from '../types'

// Forma del store (tipado)
interface FavoritosState {
  favoritos: MonedaId[]
  alternarFavorito: (id: MonedaId) => void
}

export const useFavoritos = create<FavoritosState>()(
  persist(
    (set) => ({
      favoritos: [],

      // Agrega o quita, SIN modificar el arreglo anterior (inmutable)
      alternarFavorito: (id) =>
        set((estado) => ({
          favoritos: estado.favoritos.includes(id)
            ? estado.favoritos.filter((x) => x !== id)
            : [...estado.favoritos, id],
        })),
    }),
    {
      name: 'pulso-abierto-favoritos',                      // nombre en localStorage
      partialize: (estado) => ({ favoritos: estado.favoritos }), // guarda SOLO los favoritos
    },
  ),
)