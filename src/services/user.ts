import { client } from '../bot'
import { MyContext } from '../interfaces'
import { ChatId } from '../types'

export const getUser = async (chatId: ChatId) => {
    return await client.users.findUnique({
        where: { id: chatId }
    })
}

export const banUser = async (chatId: ChatId) => {
    return await client.users.update({
        where: { id: chatId },
        data: { isBanned: true }
    })
}

export const unbanUser = async (chatId: ChatId) => {
    return await client.users.update({
        where: { id: chatId },
        data: { isBanned: false }
    })
}

export const getRole = async (chatId: ChatId) => {
    return await client.users.findUnique({
        where: { id: chatId },
        include: {
            role: true
        }
    })
}

export const getUserWithRoleAndStats = async (chatId: ChatId) => {
    return await client.users.findUnique({
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
        await client.users.create({
            data: {
                id: chatId
            }
        })

        await client.stats.create({ data: { usersId: chatId } })
    }
}

export const middleware = async (ctx: MyContext, next) => {
    const chatId = ctx.message?.chat?.id || ctx.callbackQuery?.message?.chat?.id

    if (!ctx.session.hasOwnProperty('room')) {
        await findOrCreateUser(chatId)
        ctx.session.room = null
    }

    next()
}
