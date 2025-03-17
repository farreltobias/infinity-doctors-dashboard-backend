import { type Either, left, right } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'
import type { Nullable } from '@/core/types/nullable'
import { Encrypter } from '@/domain/system/application/cryptography/encrypter'
import { HashComparer } from '@/domain/system/application/cryptography/hash-comparer'
import { AdminsRepository } from '@/domain/system/application/repositories/admins-repository'
import { OwnersRepository } from '@/domain/system/application/repositories/owners-repository'
import { WrongCredentialsError } from '@/domain/system/application/use-cases/errors/wrong-credentials-error'
import type { Admin } from '@/domain/system/enterprise/entities/admin'
import type { Owner } from '@/domain/system/enterprise/entities/owner'
import type { Systems } from '@/domain/system/enterprise/entities/value-object/systems'
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
      roles: user.roles,
      systems: user.systems,
    })

    return right({
      accessToken,
    })
  }

  private getValidUser({ owner, admin }: GetValidUserProps) {
    const roles: string[] = []
    const systems: string[] = []
    const user = {} as {
      id: UniqueEntityID
      password: string
      systems: Systems
    }

    if (owner) {
      roles.push('owner')
      systems.push(...owner.systems.toValue())
      user.id = owner.id
      user.password = owner.password
    }

    if (admin) {
      roles.push('admin')
      systems.push('admin')
      user.id = admin.id
      user.password = admin.password
    }

    if (!Object.values(user).length) return null

    return {
      ...user,
      roles,
      systems,
    }
  }
}
