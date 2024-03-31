import { transporter } from '@/lib/nodemailer'
import {
  generateVerificationEmailContent,
  generatePasswordResetEmailContent,
  generate2FAEmailContent
} from '@/lib/emailContent'

// enviar el email de verificacion
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}&email=${email}`

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      ...generateVerificationEmailContent(confirmLink),
      subject: 'Verifica tu cuenta en PsikoGames!'
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
      subject: 'Recuperación de contraseña en PsikoGames'
    })

    return { ok: true }
  } catch {
    return { error: true }
  }
}

export const sendTwoFactorEmail = async (email: string, token: string) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      ...generate2FAEmailContent(token),
      subject: 'Código 2FA para PsikoGames'
    })

    return { ok: true }
  } catch {
    return { error: true }
  }
}
