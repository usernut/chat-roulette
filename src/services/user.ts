import { client } from '../bot'
import { ChatId } from '../types'

export const getUser = async (chatId: ChatId) => {
    return await client.users.findUnique({
        where: { telegramId: chatId }
    })
}

export const banUser = async (chatId: ChatId) => {
    return await client.users.update({
        where: { telegramId: chatId },
        data: { isBanned: true }
    })
}

export const unbanUser = async (chatId: ChatId) => {
    return await client.users.update({
        where: { telegramId: chatId },
        data: { isBanned: false }
    })
}

export const getRole = async (chatId: ChatId) => {
    return await client.users.findUnique({
        where: { telegramId: chatId },
        include: {
            role: true
        }
    })
}

export const getUserWithRoleAndStats = async (chatId: ChatId) => {
    return await client.users.findUnique({
        where: { telegramId: chatId },
        include: {
            role: true,
            stats: true
        }
    })
}

export const findOrCreateUser = async (chatId: ChatId) => {
    const user = await getUser(chatId)

    if (!user) {
        const { id } = await client.users.create({
            data: {
                telegramId: chatId
            }
        })

        await client.stats.create({ data: { usersId: id } })
    }
}
