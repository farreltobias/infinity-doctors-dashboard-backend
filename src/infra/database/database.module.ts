import { AdminsRepository } from '@/domain/system/application/repositories/admins-repository'
import { OwnersRepository } from '@/domain/system/application/repositories/owners-repository'
import { PrismaAdminsRepository } from '@/infra/database/prisma/repositories/prisma-admins-repository'
import { PrismaOwnersRepository } from '@/infra/database/prisma/repositories/prisma-owners-repository'
import { Module } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'

@Module({
  providers: [
    PrismaService,
    {
      provide: OwnersRepository,
      useClass: PrismaOwnersRepository,
    },
    {
      provide: AdminsRepository,
      useClass: PrismaAdminsRepository,
    },
  ],
  exports: [PrismaService, OwnersRepository, AdminsRepository],
})
export class DatabaseModule {}
