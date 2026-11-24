import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Limpia la pantalla simulada después de cada prueba
afterEach(() => cleanup())