import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeOwner } from 'test/factories/make-owner'
import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository'
import { InMemoryOwnersRepository } from 'test/repositories/in-memory-owners-repository'
import { AuthenticateUserUseCase } from './authenticate-user'

let inMemoryOwnersRepository: InMemoryOwnersRepository
let inMemoryAdminsRepository: InMemoryAdminsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryOwnersRepository = new InMemoryOwnersRepository()
    inMemoryAdminsRepository = new InMemoryAdminsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateUserUseCase(
      inMemoryOwnersRepository,
      inMemoryAdminsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a owner', async () => {
    const owner = makeOwner({
      email: 'test-user@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryOwnersRepository.items.push(owner)

    const result = await sut.execute({
      email: 'test-user@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
