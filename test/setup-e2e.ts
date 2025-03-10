import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { DomainEvents } from '@/core/events/domain-events'
import { envSchema } from '@/infra/env/env'
import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import { MongoClient } from 'mongodb'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

const env = envSchema.parse(process.env)

const prisma = new PrismaClient()

function generateUniqueDatabaseURL(databaseId: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(env.DATABASE_URL)
  url.pathname = databaseId

  return url.toString()
}

const databaseId = randomUUID()
const databaseURL = generateUniqueDatabaseURL(databaseId)

const client = new MongoClient(databaseURL)

beforeAll(async () => {
  await client.connect()
  process.env.DATABASE_URL = databaseURL

  DomainEvents.shouldRun = false

  execSync('pnpm prisma generate')
})

afterAll(async () => {
  await client.db(databaseId).dropDatabase()
  await prisma.$disconnect()
})
