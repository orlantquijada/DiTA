require('dotenv').config();

import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'turso',
  casing: 'snake_case',
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: env
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
