# Pulso Abierto – Versión React (Actividad 3)

Aplicación web que consulta el precio actual de Bitcoin, Ethereum y Solana en dólares
usando la API pública de CoinGecko. Incluye favoritos con estado global (Zustand),
persistencia en localStorage y pruebas automatizadas.

## Instalación

    npm install

## Ejecución

    npm run dev

Abrir la dirección que aparece (por ejemplo http://localhost:5173).

## Pruebas

    npm test

Ejecuta las pruebas con Vitest y Testing Library (no realizan solicitudes reales a la API).

## Compilación

    npm run build

## Tecnologías
React · TypeScript · Vite · React Router · Zod · Zustand · Vitest · Testing Library

## Estructura
- `src/components` – componentes de presentación
- `src/pages` – páginas (inicio, detalle, 404)
- `src/services` – acceso a la API
- `src/store` – store de favoritos (Zustand + persist)
- `src/test` – pruebas automatizadas