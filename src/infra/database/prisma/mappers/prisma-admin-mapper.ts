import { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'
import { Admin } from '@/domain/system/enterprise/entities/admin'
import type { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaAdminMapper {
  static toDomain(raw: PrismaUser): Admin {
    if (!raw.partner) {
      throw new Error('Admin has no partner')
    }

    return Admin.create(
      {
        email: raw.email,
        password: raw.password,
        firstName: raw.firstName,
        lastName: raw.lastName,
        partner: raw.partner,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(admin: Admin): Prisma.UserUncheckedCreateInput {
    return {
      id: admin.id.toString(),
      email: admin.email,
      password: admin.password,
      firstName: admin.firstName,
      lastName: admin.lastName,
      systems: ['admin'],
      permissions: ['admin'],
      partner: admin.partner,
    }
  }
}
