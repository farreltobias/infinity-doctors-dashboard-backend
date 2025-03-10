import { Reflector } from '@nestjs/core'
import type { Role } from '@prisma/client'

export const Roles = Reflector.createDecorator<Role[]>()
