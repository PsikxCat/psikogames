import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import authConfig from '@/auth.config'
import { db } from '@/lib/db'
import { getUserById } from '@/data/user'
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation'
import { type UserRole } from '@prisma/client'
import { getAccountByUserId } from './data/account'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  events: {
    // el evento linkAccount se dispara cuando un usuario inicia sesión con un proveedor de autenticación externo
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // User logueado con un provider externo, finaliza callback ok
      if (account?.provider !== 'credentials') return true

      if (user?.id) {
        const existingUser = await getUserById(user.id)

        // Previene el inicio de sesión si el correo no ha sido verificado
        if (!existingUser?.emailVerified) return false

        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(user.id)

          if (!twoFactorConfirmation) return false

          await db.twoFactorConfirmation.delete({
            where: { id: twoFactorConfirmation.id }
          })
        }
      }

      return true
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
      token.name = existingUser.name
      token.email = existingUser.email
      token.isOAuth = !!existingAccount

      return token
    },
    async session({ session, token }) {
      if (token.role && session.user) session.user.role = token.role as UserRole
      if (token.sub && session.user) session.user.id = token.sub
      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email!
        session.user.isOAuth = token.isOAuth as boolean
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }

      return session
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})
