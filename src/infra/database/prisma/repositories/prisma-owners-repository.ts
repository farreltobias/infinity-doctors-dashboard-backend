import type { OwnersRepository } from '@/domain/system/application/repositories/Owners-repository'
import type { Owner } from '@/domain/system/enterprise/entities/Owner'
import { Injectable } from '@nestjs/common'
import { PrismaOwnerMapper } from '../mappers/prisma-owner-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaOwnersRepository implements OwnersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Owner | null> {
    const owner = await this.prisma.user.findUnique({
      where: { email, role: 'OWNER' },
    })

    if (!owner) return null

    return PrismaOwnerMapper.toDomain(owner)
  }
}
