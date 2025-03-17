import type { AdminsRepository } from '@/domain/system/application/repositories/Admins-repository'
import type { Admin } from '@/domain/system/enterprise/entities/Admin'
import { Injectable } from '@nestjs/common'
import { PrismaAdminMapper } from '../mappers/prisma-admin-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAdminsRepository implements AdminsRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase(), permissions: { has: 'admin' } },
    })

    if (!admin) return null

    return PrismaAdminMapper.toDomain(admin)
  }

  async findById(id: string): Promise<Admin | null> {
    const admin = await this.prisma.user.findUnique({
      where: { id, permissions: { has: 'admin' } },
    })

    if (!admin) return null

    return PrismaAdminMapper.toDomain(admin)
  }
}
