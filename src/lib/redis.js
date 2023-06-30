import { Redis } from "ioredis";

// If you want to connect using an environment variable uncomment the line below.
// import { REDIS_URI } from "$env/static/private"
// export const redis = new Redis(REDIS_URI)

// Default port is 6379
export const redis = new Redis();