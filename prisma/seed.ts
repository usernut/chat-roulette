import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
    try {        
        await prisma.roles.create({
            data: { role: 'ADMIN' }
        })
    } catch (e) {
        console.log(e)
        process.exit(1)
    } finally {
        prisma.$disconnect()
    }
}

main()
