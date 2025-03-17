import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { AdminHasNoPartnerError } from '@/domain/system/application/use-cases/errors/admin-has-no-partner'
import { GetUserByIdUseCase } from 'src/domain/system/application/use-cases/get-user-by-id'
import { makeAdmin } from 'test/factories/make-admin'
import { makeOwner } from 'test/factories/make-owner'
import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository'
import { InMemoryOwnersRepository } from 'test/repositories/in-memory-owners-repository'

let inMemoryOwnersRepository: InMemoryOwnersRepository
let inMemoryAdminsRepository: InMemoryAdminsRepository

let sut: GetUserByIdUseCase

describe('Get User By Id', () => {
  beforeEach(() => {
    inMemoryOwnersRepository = new InMemoryOwnersRepository()
    inMemoryAdminsRepository = new InMemoryAdminsRepository()

    sut = new GetUserByIdUseCase(
      inMemoryAdminsRepository,
      inMemoryOwnersRepository,
    )
  })

  it('should be able to get a owner by id', async () => {
    const owner = makeOwner()
    inMemoryOwnersRepository.items.push(owner)

    const result = await sut.execute({
      id: owner.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      user: expect.objectContaining({
        firstName: owner.firstName,
        partner: null,
      }),
    })
  })

  it('should be able to get a admin by id', async () => {
    const admin = makeAdmin()
    inMemoryAdminsRepository.items.push(admin)

    const result = await sut.execute({
      id: admin.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      user: expect.objectContaining({
        firstName: admin.firstName,
        partner: admin.partner,
      }),
    })
  })

  it('should not be able to get a user that does not exist', async () => {
    const result = await sut.execute({
      id: 'non-existing-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to get a admin that does not have a partner', async () => {
    const admin = makeAdmin({
      partner: null as unknown as string, // This could happen in old databases
    })
    inMemoryAdminsRepository.items.push(admin)

    const result = await sut.execute({
      id: admin.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AdminHasNoPartnerError)
  })
})
