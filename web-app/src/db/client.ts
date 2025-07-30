/** biome-ignore-all lint/style/noNonNullAssertion: env */
import { drizzle } from 'drizzle-orm/libsql/web';
// biome-ignore lint/performance/noNamespaceImport: schema
import * as schema from './schema';

export const db = drizzle({
  connection: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
  schema,
  casing: 'snake_case',
});
