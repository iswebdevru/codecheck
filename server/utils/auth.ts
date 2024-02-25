import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

import { OAuth2Client } from "oslo/oauth2";

export const prisma = new PrismaClient();

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !import.meta.dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      fio: attributes.fio,
      email: attributes.email,
      role: attributes.role,
      group: attributes.group,
    };
  },
});

const authorizeEndpoint = process.env.MOODLE_LOGIN_ROUTE;
const tokenEndpoint = process.env.MOODLE_TOKEN_ROUTE;

const clientId = process.env.MOODLE_CLIENTID;
export const oauth2Client = new OAuth2Client(
  clientId!,
  authorizeEndpoint!,
  tokenEndpoint!,
  {
    redirectURI: process.env.REDIRECT_URL!,
  }
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, "id">;
  }
}

export interface DatabaseUser {
  id: number;
  username: string;
  password: string;
  email: string;
  fio: string;
  role: number;
  group: string;
}
