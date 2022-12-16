import { client } from '../bot'
import { Room } from '../interfaces'
import { ChatId } from '../types'

export const updateStatsByRoom = async (room: Room) => {
    return await client.stats.updateMany({
        where: {
            OR: [
                {
                    user: {
                        id: room.users[0]
                    }
                },
                {
                    user: {
                        id: room.users[1]
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
        where: { user: { id: chatId } }
    })
}
