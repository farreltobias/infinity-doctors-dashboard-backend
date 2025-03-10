import type { Owner } from '@/domain/system/enterprise/entities/owner'

export abstract class OwnersRepository {
  abstract findByEmail(email: string): Promise<Owner | null>
}
