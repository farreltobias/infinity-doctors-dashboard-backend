import type { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'
import {
  Admin,
  type AdminProps,
} from '@/domain/system/enterprise/entities/admin'
import { faker } from '@faker-js/faker'

export function makeAdmin(
  override: Partial<AdminProps> = {},
  id?: UniqueEntityID,
) {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return Admin.create(
    {
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )
}

// @Injectable()
// export class AdminFactory {
//   constructor(private prisma: PrismaService) {}
//
//   async makePrismaAdmin(data: Partial<AdminProps> = {}): Promise<Admin> {
//     const admin = makeAdmin(data)
//
//     await this.prisma.user.create({
//       data: PrismaAdminMapper.toPrisma(admin),
//     })
//
//     return admin
//   }
// }
