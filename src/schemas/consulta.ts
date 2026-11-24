import { z } from 'zod'

// Las REGLAS que tiene que cumplir el formulario
export const esquemaConsulta = z.object({
  busqueda: z
    .string()
    .trim()   // saca los espacios de adelante y de atrás
    .refine((texto) => texto.length === 0 || texto.length >= 2, {
      message: 'Escribí al menos 2 letras o dejá el campo vacío para ver todas.',
    }),

  orden: z.enum(['nombre', 'mayor', 'menor'], {
    message: 'Elegí una opción de orden válida.',
  }),
})