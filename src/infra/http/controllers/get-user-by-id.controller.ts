import { GetUserByIdUseCase } from '@/domain/system/application/use-cases/get-user-by-id'
import { Public } from '@/infra/auth/public'
import { UserDetailsPresenter } from '@/infra/http/presenters/user-details-presenter'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

@Public()
@Controller('/users/:id')
export class GetUserByIdController {
  constructor(private getUserById: GetUserByIdUseCase) {}

  @Get()
  async handle(@Param('id') id: string) {
    const result = await this.getUserById.execute({ id })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      user: UserDetailsPresenter.toHTTP(result.value.user),
    }
  }
}
