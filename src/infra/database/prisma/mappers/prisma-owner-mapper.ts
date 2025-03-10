import { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'
import { Owner } from '@/domain/system/enterprise/entities/owner'
import type { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaOwnerMapper {
  static toDomain(raw: PrismaUser): Owner {
    return Owner.create(
      {
        email: raw.email,
        password: raw.password,
        firstName: raw.firstName,
        lastName: raw.lastName,
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
      role: 'OWNER',
    }
  }
}
