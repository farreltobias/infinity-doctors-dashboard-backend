import { type Either, left, right } from '@/core/either'
import type { Nullable } from '@/core/types/nullable'
import type { Encrypter } from '@/domain/system/application/cryptography/encrypter'
import type { HashComparer } from '@/domain/system/application/cryptography/hash-comparer'
import type { AdminsRepository } from '@/domain/system/application/repositories/admins-repository'
import type { OwnersRepository } from '@/domain/system/application/repositories/owners-repository'
import { WrongCredentialsError } from '@/domain/system/application/use-cases/errors/wrong-credentials-error'
import type { Admin } from '@/domain/system/enterprise/entities/admin'
import type { Owner } from '@/domain/system/enterprise/entities/owner'
import { Injectable } from '@nestjs/common'

interface AuthenticateUserRequestUseCase {
  email: string
  password: string
}

type AuthenticateUserResponseUseCase = Either<
  WrongCredentialsError,
  { accessToken: string }
>

type GetValidUserProps = {
  owner: Nullable<Owner>
  admin: Nullable<Admin>
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private ownersRepository: OwnersRepository,
    private adminRepository: AdminsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserRequestUseCase): Promise<AuthenticateUserResponseUseCase> {
    const owner = await this.ownersRepository.findByEmail(email)
    const admin = await this.adminRepository.findByEmail(email)

    const user = this.getValidUser({ owner, admin })

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isValidPassword = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isValidPassword) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      role: user.role,
    })

    return right({
      accessToken,
    })
  }

  private getValidUser({ owner, admin }: GetValidUserProps) {
    const ownerUser = owner
      ? { role: 'OWNER', id: owner.id, password: owner.password }
      : null

    const adminUser = admin
      ? { role: 'ADMIN', id: admin.id, password: admin.password }
      : null

    return ownerUser || adminUser
  }
}
