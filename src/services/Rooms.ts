import * as keyboards from '../keyboards'
import { IContext, Room } from '../interfaces'
import { ChatId, RoomId, Users } from '../types'

class Rooms {
    rooms: Room[] = []

    create = (ctx: IContext, users: Users) => {
        const id = users.join(':')
        const room = { id, users, messageCount: 0 }

        this.rooms.push(room)

        this.notifyUsersRoomCreated(ctx, users)
    }

    notifyUsersRoomCreated = (ctx: IContext, users: Users) => {
        users.forEach((userId) => {
            ctx.telegram.sendMessage(
                userId,
                ctx.i18n.t('companion_found'),
                keyboards.exitDialog()
            )
        })
    }

    findById = (_id: RoomId) => {
        return this.rooms.find(({ id }) => id === _id)
    }

    removeById = (_id: RoomId) => {
        this.rooms = this.rooms.filter(({ id }) => id !== _id)
    }

    incrementMessageCountById = (id: RoomId, n = 1) => {
        const room = this.findById(id)
        room.messageCount += n
    }

    getRoomByChatId = (chatId: ChatId) => {
        const room = this.rooms.find((r) => r.users.includes(chatId))

        if (!room) {
            return null
        }

        const companionId =
            room.users[0] === chatId ? room.users[1] : room.users[0]

        return { ...room, companionId }
    }
}

export default new Rooms()
