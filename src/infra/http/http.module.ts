import { AuthenticateUserUseCase } from '@/domain/system/application/use-cases/authenticate-user'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AuthenticateController],
  providers: [AuthenticateUserUseCase],
})
export class HttpModule {}
