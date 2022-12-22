import prisma from './client'
import { Room } from '../interfaces'
import { ChatId } from '../types'

export const updateStatsByRoom = async (room: Room) => {
    return await prisma.stats.updateMany({
        where: {
            userId: {
                in: room.users
            }
        },
        data: {
            totalCompanions: {
                increment: 1
            },
            totalMessages: {
                increment: room.messageCount
            }
        }
    })
}

export const getStatsByChatId = async (chatId: ChatId) => {
    return await prisma.stats.findMany({
        where: { userId: chatId }
    })
}
