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
}
