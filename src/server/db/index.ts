import { env } from "~/env";
import * as schema from "./schema";
import { Pool, neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import ws from "ws";
neonConfig.webSocketConstructor = ws;

neonConfig.fetchConnectionCache = true;
const pool = new Pool({ connectionString: env.DATABASE_URL });
pool.on("error", (err) => console.error(err)); // deal with e.g. re-connect
// ...

const client = await pool.connect();

export const db = drizzle(client, { schema });
