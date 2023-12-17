import { env } from "~/env";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;

neonConfig.fetchConnectionCache = true;
const sql = neon(env.DATABASE_URL);

export const db = drizzle(sql, { schema });
