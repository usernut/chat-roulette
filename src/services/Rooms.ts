import { MyContext, Room } from '../interfaces'
import { RoomId, Users } from '../types'
import * as keyboards from '../keyboards'
import { bot, localSession } from '../bot'

export class Rooms {
    rooms: Room[] = []

    create = async (ctx: MyContext, users: Users) => {
        const id = users.join(':')
        const room = {
            id,
            users,
            messageCount: 0
        }

        this.rooms.push(room)

        await this.notifyUsersRoomCreated(ctx, users, id)
    }

    notifyUsersRoomCreated = async (
        ctx: MyContext,
        users: Users,
        roomId: RoomId
    ) => {
        ctx.session.room = roomId

        users.forEach(async (userId) => {
            bot.telegram.sendMessage(
                userId,
                ctx.i18n.t('companion_found'),
                keyboards.exitDialog()
            )

            await localSession.saveSession(`${userId}:${userId}`, {
                room: roomId
            })
        })
    }

    findById = (_id: string) => {
        return this.rooms.find(({ id }) => id === _id)
    }

    removeById = (_id: string) => {
        this.rooms.filter(({ id }) => id !== _id)
    }
}
