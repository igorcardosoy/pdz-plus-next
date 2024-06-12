import NextAuth, { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord";
import jwt from 'jsonwebtoken'
import { api } from "@/utils/api";

const secretKey = process.env.SECRETE_KEY


export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID??"",
        clientSecret: process.env.DISCORD_CLIENT_SECRET??""
      })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const encryptedToken = jwt.sign({ access_token: account.access_token }, secretKey, { algorithm: 'HS256' })
        token.jwt = encryptedToken
        api.defaults.headers["Authorization"] = `Bearer ${encryptedToken}`
      }
      
      
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if(session){
        session.jwt = token.jwt
      }
      
      return session
    },

}}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }