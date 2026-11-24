import { Link, Route, Routes } from 'react-router-dom'
import PaginaInicio from './pages/PaginaInicio'
import PaginaDetalle from './pages/PaginaDetalle'
import PaginaNoEncontrada from './pages/PaginaNoEncontrada'
import { useFavoritos } from './store/favoritos'

function App() {
  // DATO DERIVADO: se calcula de la colección, no se guarda aparte
  const cantidadFavoritos = useFavoritos((estado) => estado.favoritos.length)

  return (
    <>
      <header>
        <h1>
          <Link to="/" className="logo">Pulso Abierto</Link>
        </h1>
        <p>Muestra el precio de Bitcoin, Ethereum y Solana en dólares.</p>
        <p className="contador-favoritos">★ Favoritos: {cantidadFavoritos}</p>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/criptomonedas/:id" element={<PaginaDetalle />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>

      <footer>
        <p>Datos provistos por la API pública de CoinGecko.</p>
      </footer>
    </>
  )
}

export default App