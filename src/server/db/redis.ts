import Redis, { RedisOptions } from "ioredis";
import { env } from "~/env";

const options: RedisOptions = {
  host: process.env.REDIS_HOST,
  port: Number.parseInt("" + process.env.REDIS_PORT),
  db: 1,
};

export const redisPub = new Redis(env.KV_URL, { tls: {} });
export const redisSub = new Redis(env.KV_URL, { tls: {} });
