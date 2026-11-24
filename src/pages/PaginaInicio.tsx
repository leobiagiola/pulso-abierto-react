import { useState } from 'react'
import { obtenerPrecios } from '../services/coingecko'
import type { Criptomoneda, Criterios, FaseConsulta } from '../types'
import FormularioConsulta from '../components/FormularioConsulta'
import EstadoConsulta from '../components/EstadoConsulta'
import ListaResultados from '../components/ListaResultados'

function PaginaInicio() {
  const [monedas, setMonedas] = useState<Criptomoneda[]>([])
  const [fase, setFase] = useState<FaseConsulta>('inicial')
  const [criterios, setCriterios] = useState<Criterios>({ busqueda: '', orden: 'nombre' })

  async function consultar() {
    setFase('carga')
    try {
      const datos = await obtenerPrecios()
      setMonedas(datos)
      setFase('exito')
    } catch {
      setMonedas([])
      setFase('error')
    }
  }

  function manejarConsulta(nuevos: Criterios) {
    setCriterios(nuevos)
    consultar()
  }

  // DATO DERIVADO: la lista visible se calcula
  const texto = criterios.busqueda.toLowerCase()
  const filtradas = monedas.filter(
    (m) => m.nombre.toLowerCase().includes(texto) || m.simbolo.toLowerCase().includes(texto),
  )
  const visibles = [...filtradas].sort((a, b) => {
    if (criterios.orden === 'mayor') return b.precioUsd - a.precioUsd
    if (criterios.orden === 'menor') return a.precioUsd - b.precioUsd
    return a.nombre.localeCompare(b.nombre)
  })

  return (
    <>
      <section>
        <h2>Consultar precios</h2>
        <FormularioConsulta cargando={fase === 'carga'} onConsultar={manejarConsulta} />
      </section>

      <EstadoConsulta fase={fase} cantidad={visibles.length} onReintentar={consultar} />

      <section>
        <h2>Resultados</h2>
        <ListaResultados monedas={visibles} />
      </section>
    </>
  )
}

export default PaginaInicio