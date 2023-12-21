import Redis from "ioredis";
import { env } from "~/env";

export const redisPub = new Redis(env.KV_URL, { tls: {} });
export const redisSub = new Redis(env.KV_URL, { tls: {} });
