import { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'
import type { AdminsRepository } from '@/domain/system/application/repositories/admins-repository'
import type { Admin } from '@/domain/system/enterprise/entities/admin'

export class InMemoryAdminsRepository implements AdminsRepository {
  public items: Admin[] = []

  async findByEmail(email: string) {
    const admin = this.items.find((item) => item.email === email)

    if (!admin) {
      return null
    }

    return admin
  }

  async findById(id: string) {
    const admin = this.items.find((item) =>
      item.id.equals(new UniqueEntityID(id)),
    )

    if (!admin) {
      return null
    }

    return admin
  }
}
