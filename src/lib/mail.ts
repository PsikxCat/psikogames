import { transporter } from '@/lib/nodemailer'
import {
  generateVerificationEmailContent,
  generatePasswordResetEmailContent
} from '@/lib/emailContent'

// enviar el email de verificacion
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}&email=${email}`

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      ...generateVerificationEmailContent(confirmLink),
      subject: 'Verifica tu correo!'
    })

    return { ok: true }
  } catch {
    return { error: true }
  }
}

// enviar el email de reseteo de contraseña
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.BASE_URL}/auth/reset-password?token=${token}&email=${email}`

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      ...generatePasswordResetEmailContent(resetLink),
      subject: 'Recupera tu contraseña!'
    })

    return { ok: true }
  } catch {
    return { error: true }
  }
}
