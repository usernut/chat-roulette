import { Context } from 'telegraf'
import { I18nContext } from '@esindger/telegraf-i18n'
import { Users, RoomId, ChatId, Middleware } from '../types'

export interface Handler {
    triggers: string | string[]
    middlewares: Middleware[]
    callback: Middleware
}

export interface ChatIdParams {
    chatId: ChatId
}

export interface Action<T> {
    params: T
}

export interface SessionData {
    checked: boolean
}

export interface IContext extends Context {
    session: SessionData
    i18n: I18nContext
}

export interface Room {
    id: RoomId
    users: Users
    messageCount: number
}
