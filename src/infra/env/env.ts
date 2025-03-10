import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  HASH_SALT_LENGTH: z.coerce.number(),
  PORT: z.coerce.number().optional().default(3333),
  SEED_PASSWORD: z.string().default('123456'),
})

export type Env = z.infer<typeof envSchema>
