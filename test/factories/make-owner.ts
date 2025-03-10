import type { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'
import {
  Owner,
  type OwnerProps,
} from '@/domain/system/enterprise/entities/owner'
import { Systems } from '@/domain/system/enterprise/entities/value-object/systems'
import { PrismaOwnerMapper } from '@/infra/database/prisma/mappers/prisma-owner-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeOwner(
  override: Partial<OwnerProps> = {},
  id?: UniqueEntityID,
) {
  const firstName = override.firstName || faker.person.firstName()
  const lastName = override.lastName || faker.person.lastName()

  return Owner.create(
    {
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }),
      password: faker.internet.password(),
      systems: Systems.create(['admin', 'patients']),
      ...override,
    },
    id,
  )
}

@Injectable()
export class OwnerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaOwner(data: Partial<OwnerProps> = {}): Promise<Owner> {
    const owner = makeOwner(data)

    await this.prisma.user.create({
      data: PrismaOwnerMapper.toPrisma(owner),
    })

    return owner
  }
}
