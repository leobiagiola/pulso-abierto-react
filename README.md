# Pulso Abierto

Aplicación web que consulta el precio actual de Bitcoin, Ethereum y Solana en dólares
estadounidenses usando la API pública de CoinGecko. Permite buscar y ordenar monedas,
ver el detalle de cada una y marcar favoritos, que se conservan al recargar la página.

🔗 **Aplicación publicada:** https://pulso-abierto-react-five.vercel.app

## Tecnologías

React · TypeScript · Vite · React Router · Zustand · Zod · Vitest · Testing Library · Vercel

## Instalación

```
npm install
```

## Comandos

| Acción | Comando |
|---|---|
| Ejecutar en desarrollo | `npm run dev` |
| Ejecutar las pruebas | `npm run test` |
| Revisar el código (lint) | `npm run lint` |
| Generar el build | `npm run build` |
| Comprobar el build | `npm run preview` |

## Variables de entorno

El proyecto no utiliza variables de entorno. La API de CoinGecko es pública y no requiere clave.

## Despliegue

El proyecto está vinculado con Vercel desde el repositorio de GitHub. Cada push a la rama
`main` genera un nuevo despliegue.

- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

## Mejora de mantenibilidad

- **Problema identificado:** el servicio `src/services/coingecko.ts` conservaba la constante
  `PRUEBA` y la función `armarURL`, usadas en etapas anteriores para simular los estados de
  carga, error y vacío. Ese código ya no se utilizaba, porque las pruebas automatizadas
  simulan esos casos reemplazando `fetch`.
- **Cambio realizado:** eliminé `PRUEBA` y `armarURL`; la URL se arma directamente dentro de
  `obtenerPrecios`. El comportamiento del servicio no cambió.
- **Comprobación:** `npm run test` (5 pruebas superadas), `npm run lint` (sin errores),
  `npm run build` (correcto) y consulta manual de precios en el navegador.

## Problema detectado en la versión publicada

Al recargar una página de detalle (por ejemplo `/criptomonedas/bitcoin`) en Vercel aparecía
un error **404 NOT_FOUND**. En desarrollo y en preview no ocurría.

- **Causa:** la aplicación es una SPA. Al recargar, Vercel buscaba un archivo con esa ruta,
  que no existe; las rutas las resuelve React Router dentro de `index.html`.
- **Corrección:** agregué `vercel.json` con una regla que redirige todas las rutas a
  `index.html`.
- **Comprobación:** después del nuevo despliegue, la página de detalle carga correctamente al
  recargarla o al abrirla con un enlace directo.

## Verificación final

- ✅ **Pruebas ejecutadas:** `npm run test` → 2 archivos, 5 pruebas superadas.
- ✅ **Lint:** `npm run lint` sin errores.
- ✅ **Build generado correctamente:** `npm run build`.
- ✅ **Preview comprobado:** `npm run preview` → consulta, navegación, favoritos y consola sin
  errores de la aplicación.
- ✅ **Despliegue realizado:** https://pulso-abierto-react-five.vercel.app → carga, consulta a
  la API, navegación al detalle, recarga de rutas, favoritos, formulario y vista responsiva.
- 📅 **Fecha de verificación:** 24/11/2026