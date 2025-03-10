import type { HashComparer } from '@/domain/system/application/cryptography/hash-comparer'
import type { HashGenerator } from '@/domain/system/application/cryptography/hash-generator'
import { EnvService } from '@/infra/env/env.service'
import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  constructor(private envService: EnvService) {}

  async hash(plain: string): Promise<string> {
    return hash(plain, Number(this.envService.get('HASH_SALT_LENGTH')))
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
