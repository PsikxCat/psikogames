import { transporter } from '@/lib/nodemailer'
import { generateVerificationEmailContent } from '@/lib/emailContent'

export const sendVerificationEmail = async (email: string, token: string) => {
  // ! pendiente ruta produccion !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
