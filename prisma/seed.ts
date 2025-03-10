import * as process from 'node:process'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { type Env, envSchema } from '@/infra/env/env'
import { EnvService } from '@/infra/env/env.service'
import { ConfigService } from '@nestjs/config'
import { AdminFactory } from 'test/factories/make-admin'
import { OwnerFactory } from 'test/factories/make-owner'

const prisma = new PrismaService()
const env = envSchema.parse(process.env)

async function seed() {
  const configService = new ConfigService<Env, true>()
  const envService = new EnvService(configService)

  const hasher = new BcryptHasher(envService)
  const hashedPassword = await hasher.hash(env.SEED_PASSWORD)

  await prisma.user.deleteMany()

  const ownerFactory = new OwnerFactory(prisma)
  await ownerFactory.makePrismaOwner({
    password: hashedPassword,
  })

  const adminFactory = new AdminFactory(prisma)
  await adminFactory.makePrismaAdmin({
    password: hashedPassword,
  })
}

seed()
