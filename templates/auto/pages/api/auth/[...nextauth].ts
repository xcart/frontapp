/* eslint-disable no-param-reassign */
import jwtDecode, {JwtPayload} from 'jwt-decode'
import type {NextApiRequest, NextApiResponse} from 'next'
import NextAuth, {AuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {client} from 'utils/unauthenticated-client'

const DAY = 24 * 60 * 60
const MONTH = 30 * 24 * 60 * 60

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'},
      },
      // @ts-ignore
      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        const {email, password} = credentials

        const tokens = await client.other.apiStorefrontAuthLogin({
          username: email,
          password,
        })

        if (tokens?.token) {
          const payload: JwtPayload = jwtDecode(tokens.token)

          return {
            access_token: tokens.token,
            access_token_exp: payload.exp,
            refresh_token: tokens.refresh_token,
            refresh_token_exp: tokens.refresh_token_expiration,
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        // @ts-ignore
        token.access_token = user.access_token
        // @ts-ignore
        token.access_token_exp = user.access_token_exp
        // @ts-ignore
        token.refresh_token = user.refresh_token
        // @ts-ignore
        token.refresh_token_exp = user.refresh_token_exp
      } else if (Date.now() > (token.access_token_exp as number) * 1000) {
        const newTokens = await client.other.apiStorefrontAuthRefresh({
          refresh_token: token.refresh_token as string,
        })

        if (!(newTokens instanceof Error)) {
          const payload: JwtPayload = jwtDecode(newTokens.token as string)

          return {
            access_token: newTokens.token,
            access_token_exp: payload.exp,
            refresh_token: newTokens.refresh_token,
            refresh_token_exp: newTokens.refresh_token_expiration,
          }
        }

        return {}
      }

      return token
    },
    async session({session, token}) {
      if (token) {
        // @ts-ignore
        session.access_token = token.access_token
        // @ts-ignore
        session.access_token_exp = token.access_token_exp
      }

      return session
    },
  },
  events: {
    async signOut({token}) {
      if (token?.refresh_token) {
        await client.other.apiStorefrontAuthLogout({
          refresh_token: token.refresh_token as string,
        })
      }
    },
  },
  jwt: {
    maxAge: DAY,
  },
  session: {
    maxAge: DAY,
  },
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  let maxAge = DAY

  if (req.cookies.remember_me) {
    maxAge = req.cookies.remember_me === 'true' ? MONTH : DAY
  }

  return NextAuth(req, res, {
    ...authOptions,
    jwt: {
      maxAge,
    },
    session: {
      maxAge,
    },
  })
}
