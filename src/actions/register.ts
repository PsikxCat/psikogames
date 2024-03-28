'use server'

import { type z } from 'zod'
import bcrypt from 'bcryptjs'

import { RegisterSchema } from '@/schemas'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values)
  if (!validateFields.success) return { error: 'Datos invalidos!' }

  const { name, email, password } = validateFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)
  if (existingUser) return { error: 'Ya existe un usuario asociado a este correo!' }

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  if (!newUser) return { error: 'Error al crear usuario!' }

  const verificationToken = await generateVerificationToken(email)

  const verificationEmail = await sendVerificationEmail(verificationToken.email, verificationToken.token)
  if (verificationEmail.error) return { error: 'Error al enviar email de verificación! Intenta de nuevo.' }

  return { success: 'Email de verificación enviado! Por favor revisa tu bandeja de entrada.' }
}
