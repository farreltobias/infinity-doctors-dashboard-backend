import type { Admin } from '@/domain/system/enterprise/entities/admin'

export abstract class AdminsRepository {
  abstract findByEmail(email: string): Promise<Admin | null>
  abstract findById(id: string): Promise<Admin | null>
}
