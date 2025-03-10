import { Reflector } from '@nestjs/core'
import type { Permission } from '@prisma/client'

export const Roles = Reflector.createDecorator<Permission[]>()
