import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import bcrypt from 'bcryptjs'

import { LoginSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials)

        if (validateFields.success) {
          const { email, password } = validateFields.data

          const user = await getUserByEmail(email)
          if (!user?.password) return null

          const passwordMatch = await bcrypt.compare(password, user.password)
          if (!passwordMatch) return null

          return user
        }

        return null
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ]
} satisfies NextAuthConfig
