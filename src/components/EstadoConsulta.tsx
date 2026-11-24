import type { FaseConsulta } from '../types'

interface Props {
  fase: FaseConsulta
  cantidad: number
  onReintentar: () => void   // una FUNCIÓN que recibe por props
}

function EstadoConsulta({ fase, cantidad, onReintentar }: Props) {
  // Elige el mensaje según la fase (y la cantidad)
  let mensaje = 'Todavía no se realizó ninguna consulta.'
  let tipo = 'inicial'

  if (fase === 'carga') {
    mensaje = '⏳ Cargando… consultando los precios.'
    tipo = 'carga'
  } else if (fase === 'error') {
    mensaje = '⚠️ Error: no se pudo completar la consulta. Revisá tu conexión e intentá de nuevo.'
    tipo = 'error'
  } else if (fase === 'exito' && cantidad === 0) {
    mensaje = '📭 Sin resultados: no hay monedas para mostrar.'
    tipo = 'vacio'
  } else if (fase === 'exito') {
        mensaje = `✅ Consulta completada: ${cantidad} ${cantidad === 1 ? 'resultado' : 'resultados'}.`
    tipo = 'resultado'
  }

  return (
    <>
      <div id="estado" className={'estado-' + tipo} role="status" aria-live="polite">
        {mensaje}
      </div>

      {fase === 'error' && (
        <button type="button" id="btn-reintentar" onClick={onReintentar} autoFocus>
          Volver a intentar
        </button>
      )}
    </>
  )
}

export default EstadoConsulta