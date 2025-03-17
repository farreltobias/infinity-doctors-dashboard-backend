import { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'
import type { OwnersRepository } from '@/domain/system/application/repositories/owners-repository'
import type { Owner } from '@/domain/system/enterprise/entities/owner'

export class InMemoryOwnersRepository implements OwnersRepository {
  public items: Owner[] = []

  async findByEmail(email: string) {
    const owner = this.items.find((item) => item.email === email)

    if (!owner) {
      return null
    }

    return owner
  }

  async findById(id: string) {
    const owner = this.items.find((item) =>
      item.id.equals(new UniqueEntityID(id)),
    )

    if (!owner) {
      return null
    }

    return owner
  }
}
