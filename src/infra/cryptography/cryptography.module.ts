import { EnvModule } from '@/infra/env/env.module'
import { Module } from '@nestjs/common'

import { Encrypter } from '@/domain/system/application/cryptography/encrypter'
import { HashComparer } from '@/domain/system/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/system/application/cryptography/hash-generator'

import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
  imports: [EnvModule],
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
