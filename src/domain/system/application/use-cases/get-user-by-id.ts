import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { OwnersRepository } from '@/domain/system/application/repositories/owners-repository'
import { AdminHasNoPartnerError } from '@/domain/system/application/use-cases/errors/admin-has-no-partner'
import type { Admin } from '@/domain/system/enterprise/entities/admin'
import type { Owner } from '@/domain/system/enterprise/entities/owner'
import { UserDetails } from '@/domain/system/enterprise/entities/value-object/user-details'
import { Injectable } from '@nestjs/common'
import { AdminsRepository } from '../repositories/admins-repository'

interface GetUserByIdRequestUseCase {
  id: string
}

type GetUserByIdResponseUseCase = Either<
  ResourceNotFoundError,
  { user: UserDetails }
>

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
    private ownersRepository: OwnersRepository,
  ) {}

  async execute({
    id,
  }: GetUserByIdRequestUseCase): Promise<GetUserByIdResponseUseCase> {
    const owner = await this.ownersRepository.findById(id)

    if (owner) {
      const userDetails = this.getUserDetails(owner)
      return right({ user: userDetails })
    }

    const admin = await this.adminsRepository.findById(id)

    if (!admin) {
      return left(new ResourceNotFoundError())
    }

    if (!admin.partner) {
      return left(new AdminHasNoPartnerError())
    }

    const userDetails = this.getUserDetails(admin, true)
    return right({ user: userDetails })
  }

  getUserDetails(user: Owner | Admin, isAdmin = false): UserDetails {
    return UserDetails.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      partner: isAdmin ? (user as Admin).partner : null,
    })
  }
}
