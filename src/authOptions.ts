import { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './lib/prisma';

interface CustomUser extends NextAuthUser {
  token: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'example@email.com' },
        password: { label: 'password', type: 'password', placeholder: 'test1234!' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(process.env.NEXT_PUBLIC_APP_URL + '/api/proxy', {
            method: 'POST',
            body: JSON.stringify({
              path: '/api/v1/auth/signin',
              method: 'POST',
              data: { email: credentials?.email, password: credentials?.password },
            }),
            headers: { 'Content-Type': 'application/json' },
          });
          const resData = await res.json();
          const account = await prisma.accounts.findFirst({ where: { email: credentials?.email } });

          if (!res.ok) return null;

          return {
            id: account?.id ?? 'default-id',
            email: account?.email,
            name: account?.name,
            token: resData.token,
          } as CustomUser;
        } catch (error) {
          throw new Error(JSON.stringify(error));
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = (user as CustomUser).token;
        token.id = (user as CustomUser).id;
        token.email = (user as CustomUser).email;
        token.name = (user as CustomUser).name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.token = token.token;
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
} as NextAuthOptions;

declare module 'next-auth' {
  interface User {
    token: string;
    id: string;
    name: string; // ✅ 추가
    email: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      token: string;
      name: string; // ✅ 추가
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: string;
    id: string;
    email: string;
    name: string; // ✅ 추가
  }
}
