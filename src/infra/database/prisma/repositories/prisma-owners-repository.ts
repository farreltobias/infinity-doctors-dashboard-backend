import type { OwnersRepository } from '@/domain/system/application/repositories/owners-repository'
import type { Owner } from '@/domain/system/enterprise/entities/owner'
import { Injectable } from '@nestjs/common'
import { PrismaOwnerMapper } from '../mappers/prisma-owner-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaOwnersRepository implements OwnersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Owner | null> {
    const owner = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase(), permissions: { has: 'owner' } },
    })

    if (!owner) return null

    return PrismaOwnerMapper.toDomain(owner)
  }

  async findById(id: string): Promise<Owner | null> {
    const owner = await this.prisma.user.findUnique({
      where: { id, permissions: { has: 'owner' } },
    })

    if (!owner) return null

    return PrismaOwnerMapper.toDomain(owner)
  }
}
