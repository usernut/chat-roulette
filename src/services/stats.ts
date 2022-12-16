import { client } from '../bot'
import { Room } from '../interfaces'
import { ChatId } from '../types'

export const updateStatsByRoom = async (room: Room) => {
    return await client.stats.updateMany({
        where: {
            OR: [
                {
                    user: {
                        telegramId: room.users[0]
                    }
                },
                {
                    user: {
                        telegramId: room.users[1]
                    }
                }
            ]
        },
        data: {
            total_companions: {
                increment: 1
            },
            total_messages: {
                increment: room.messageCount
            }
        }
    })
}

export const getStatsByChatId = async (chatId: ChatId) => {
    return await client.stats.findMany({
        where: { user: { telegramId: chatId } }
    })
}
