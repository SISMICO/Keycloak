import type { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

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
};
