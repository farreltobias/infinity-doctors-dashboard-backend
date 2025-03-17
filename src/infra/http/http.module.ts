import { AuthenticateUserUseCase } from '@/domain/system/application/use-cases/authenticate-user'
import { GetUserByIdUseCase } from '@/domain/system/application/use-cases/get-user-by-id'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { GetUserByIdController } from '@/infra/http/controllers/get-user-by-id.controller'
import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AuthenticateController, GetUserByIdController],
  providers: [AuthenticateUserUseCase, GetUserByIdUseCase],
})
export class HttpModule {}
