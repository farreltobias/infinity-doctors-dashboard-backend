import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let adminFactory: AdminFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    adminFactory = moduleRef.get(AdminFactory)

    await app.init()
  })

  test('[GET] /users/:id', async () => {
    const admin = await adminFactory.makePrismaAdmin({
      email: 'johndoe@example.com',
      password: await hash('123456', 8),
    })

    const response = await request(app.getHttpServer())
      .get(`/users/${admin.id.toString()}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      user: expect.objectContaining({
        firstName: admin.firstName,
        partner: admin.partner,
      }),
    })
  })
})
