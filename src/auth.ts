import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import authConfig from '@/auth.config'
import { db } from '@/lib/db'
import { getUserById } from './data/user'

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

      // Si user logueado con credenciales no tiene email verificado, no inicia sesión
      if (user?.id) {
        const existingUser = await getUserById(user.id)
        if (!existingUser?.emailVerified) return false
      }

      return true
    },
    async jwt({ token }) {
      // console.log('jwt', token)

      return token
    },
    async session({ session, token }) {
      // console.log('session', session)
      // console.log('token', token)

      return session
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})
