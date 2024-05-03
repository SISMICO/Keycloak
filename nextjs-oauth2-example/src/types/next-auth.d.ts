import { User } from 'next-auth';
import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    access_token?: string;
    user?: User;
  }
}

declare module 'next-auth' {
  interface Account {
    expires_at?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token?: string;
    expires_at?: number;
    refresh_token?: string;
    user?: User;
  }
}

