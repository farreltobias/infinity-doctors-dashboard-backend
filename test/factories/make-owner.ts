import type { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'
import {
  Owner,
  type OwnerProps,
} from '@/domain/system/enterprise/entities/owner'
import { faker } from '@faker-js/faker'

export function makeOwner(
  override: Partial<OwnerProps> = {},
  id?: UniqueEntityID,
) {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return Owner.create(
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
// export class OwnerFactory {
//   constructor(private prisma: PrismaService) {}
//
//   async makePrismaOwner(data: Partial<OwnerProps> = {}): Promise<Owner> {
//     const owner = makeOwner(data)
//
//     await this.prisma.user.create({
//       data: PrismaOwnerMapper.toPrisma(owner),
//     })
//
//     return owner
//   }
// }
