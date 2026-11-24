import { Link } from 'react-router-dom'

function PaginaNoEncontrada() {
  return (
    <section>
      <h2>Página no encontrada (404)</h2>
      <p>⚠️ La dirección que buscás no existe.</p>
      <Link to="/">← Volver al inicio</Link>
    </section>
  )
}

export default PaginaNoEncontrada