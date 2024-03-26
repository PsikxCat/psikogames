'use server'

import { type z } from 'zod'
import bcrypt from 'bcryptjs'

import { RegisterSchema } from '@/schemas'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values)

  if (!validateFields.success) return { error: 'Datos invalidos!' }

  const { name, email, password } = validateFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)
  if (existingUser) return { error: 'Ya existe un usuario asociado a este correo!' }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  return { success: 'Usuario creado!' }
}
