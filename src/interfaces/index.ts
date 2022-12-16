import { Context } from 'telegraf'
import { I18nContext } from '@esindger/telegraf-i18n'
import { Message, Update } from 'telegraf/typings/core/types/typegram'
import { Users, RoomId } from '../types'

export interface Session {
    room?: string
}

export interface MyContext extends Context<Update> {
    session?: Session
    message: Update.New & Update.NonChannel & Message.TextMessage
    i18n?: I18nContext
}

export interface Room {
    id: RoomId
    users: Users
    messageCount: number
}
