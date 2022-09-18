import {PrismaClient} from '@prisma/client'

let prisma: PrismaClient = null;

export default class PrismaService {
  public static prisma(): PrismaClient {
    if (prisma !== null) {
      return prisma
    }

    prisma = new PrismaClient()

    return prisma
  }
}
