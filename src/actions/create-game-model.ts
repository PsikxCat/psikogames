'use server'

import { type z } from 'zod'

import { db } from '@/lib/db'
import { NewGameModelSchema } from '@/schemas'

export const createGameModel = async (values: z.infer<typeof NewGameModelSchema>) => {
  const validateFields = NewGameModelSchema.safeParse(values)
  if (!validateFields.success) return { error: 'Datos invalidos!' }

  const { name, description, imageUrl } = validateFields.data

  const existingGameModel = await db.game.findFirst({
    where: { name }
  })

  if (existingGameModel) {
    return { error: 'Ya existe un modelo de juego con ese nombre.' }
  }

  const gameModel = await db.game.create({
    data: {
      name,
      description,
      imageUrl
    }
  })

  return { success: 'Modelo de juego creado correctamente.', gameModel }
}
