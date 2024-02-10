import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

// import { webcrypto } from "crypto";
// globalThis.crypto = webcrypto as Crypto;

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

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, "id">;
  }
}

export interface DatabaseUser {
  id: string;
  username: string;
  password: string;
  email: string;
  fio: string;
  role: number;
  group: string;
}
