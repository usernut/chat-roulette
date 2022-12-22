import prisma from './client'
import { ChatId } from '../types'

export const getUser = async (chatId: ChatId) => {
    return await prisma.users.findUnique({
        where: { id: chatId }
    })
}

export const banUser = async (chatId: ChatId) => {
    return await prisma.users.update({
        where: { id: chatId },
        data: { isBanned: true }
    })
}

export const unbanUser = async (chatId: ChatId) => {
    return await prisma.users.update({
        where: { id: chatId },
        data: { isBanned: false }
    })
}

export const getRole = async (chatId: ChatId) => {
    return await prisma.users.findUnique({
        where: { id: chatId },
        include: { role: true }
    })
}

export const getUserWithRoleAndStats = async (chatId: ChatId) => {
    return await prisma.users.findUnique({
        where: { id: chatId },
        include: {
            role: true,
            stats: true
        }
    })
}

export const findOrCreateUser = async (chatId: ChatId) => {
    const user = await getUser(chatId)

    if (!user) {
        await prisma.users.create({
            data: {
                id: chatId,
                stats: { create: {} }
            }
        })
    }
}
