import { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'
import { Owner } from '@/domain/system/enterprise/entities/owner'
import { Systems } from '@/domain/system/enterprise/entities/value-object/systems'
import type { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaOwnerMapper {
  static toDomain(raw: PrismaUser): Owner {
    return Owner.create(
      {
        email: raw.email,
        password: raw.password,
        firstName: raw.firstName,
        lastName: raw.lastName,
        systems: Systems.create(raw.systems),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(owner: Owner): Prisma.UserUncheckedCreateInput {
    return {
      id: owner.id.toString(),
      email: owner.email,
      password: owner.password,
      firstName: owner.firstName,
      lastName: owner.lastName,
      systems: owner.systems.toValue(),
      permissions: ['owner'],
    }
  }
}
