import type { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const isRefreshTokenValid = (expiresAt: number): boolean => {
  return Date.now() < expiresAt * 1000
}

// Define authentication options using NextAuthOptions interface
export const options: NextAuthOptions = {
  // Customize authentication pages
  pages: {
    signIn: "/login", // Redirect users to "/login" when signing in
  },
  // Configure session management
  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
  },
  // added secret key
  secret: process.env.NEXT_PUBLIC_SECRET,
  // Configure authentication providers
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID as string,
      clientSecret: process.env.KEYCLOAK_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER as string,
    }),
    // CredentialsProvider({}), // Include a Credentials provider (username/password)
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (token) {
        session.access_token = token.access_token;
        session.user = token.user;
      }
      return session
    },
    async jwt({ token, account, user }) {
      // console.log(`Account: ${JSON.stringify(account)}`)
      // console.log(`Token: ${JSON.stringify(token)}`)
      // console.log(`User: ${JSON.stringify(user)}`)

      if (account && user) {
        return {
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          user: user,
        }
      }
      
      if (token && token.expires_at && isRefreshTokenValid(token.expires_at)) {
        return token
      } else {
        // if (token.refresh_token) token.refresh_token = undefined;
        if (!token.refresh_token) throw new Error("Missing refresh token")

        // If the access token has expired, try to refresh it
        try {
          console.log('Refreshing token')
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch("http://localhost:8080/realms/master/protocol/openid-connect/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.KEYCLOAK_ID! as string,
              client_secret: process.env.KEYCLOAK_SECRET! as string,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token as string,
            }),
            method: "POST",
          })

          const tokens = await response.json()

          if (!response.ok) throw tokens

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          }
        } catch (error) {
          console.error("Error refreshing access token", error)
          // The error property will be used client-side to handle the refresh token error
          throw { ...token, error: "RefreshAccessTokenError" as const }
          // return { ...token, error: "RefreshAccessTokenError" as const }
        }
      }
    },
  },
};
