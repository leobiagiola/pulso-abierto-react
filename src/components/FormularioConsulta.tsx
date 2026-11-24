import { useState } from 'react'
import type { Criterios, Orden } from '../types'
import { esquemaConsulta } from '../schemas/consulta'

interface Props {
  cargando: boolean
  onConsultar: (criterios: Criterios) => void
}

// Los mensajes de error de cada campo (pueden no existir)
interface Errores {
  busqueda?: string
  orden?: string
}

function FormularioConsulta({ cargando, onConsultar }: Props) {
  const [busqueda, setBusqueda] = useState('')
  const [orden, setOrden] = useState<Orden>('nombre')
  const [errores, setErrores] = useState<Errores>({})

  function enviar(e: React.FormEvent) {
    e.preventDefault()

    // Valida los datos con Zod (safeParse NO tira error, devuelve un resultado)
    const resultado = esquemaConsulta.safeParse({ busqueda, orden })

    if (!resultado.success) {
      // Junta los mensajes por campo
      const nuevos: Errores = {}
      for (const problema of resultado.error.issues) {
        const campo = problema.path[0] as keyof Errores
        nuevos[campo] = problema.message
      }
      setErrores(nuevos)
      return   // ⛔ NO consulta si hay errores
    }

    setErrores({})
    onConsultar(resultado.data)   // datos ya validados (y sin espacios de más)
  }

  return (
    <form className="formulario" onSubmit={enviar} noValidate>
      <div className="campo">
        <label htmlFor="busqueda">Buscar moneda</label>
        <input
          id="busqueda"
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Ej: bit, eth, sol"
          aria-invalid={errores.busqueda ? true : undefined}
          aria-describedby={errores.busqueda ? 'error-busqueda' : undefined}
        />
        {errores.busqueda && (
          <p id="error-busqueda" className="error-campo">
            ⚠️ {errores.busqueda}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="orden">Ordenar por</label>
        <select
          id="orden"
          value={orden}
          onChange={(e) => setOrden(e.target.value as Orden)}
          aria-invalid={errores.orden ? true : undefined}
          aria-describedby={errores.orden ? 'error-orden' : undefined}
        >
          <option value="nombre">Nombre (A-Z)</option>
          <option value="mayor">Precio: mayor a menor</option>
          <option value="menor">Precio: menor a mayor</option>
        </select>
        {errores.orden && (
          <p id="error-orden" className="error-campo">
            ⚠️ {errores.orden}
          </p>
        )}
      </div>

      <button type="submit" disabled={cargando}>
        Consultar precios
      </button>
    </form>
  )
}

export default FormularioConsulta