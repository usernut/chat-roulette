import { Action, ChatIdParams, IContext } from '../interfaces'

export type ChatId = number
export type RoomId = string
export type Users = [ChatId, ChatId]
export type Next = () => Promise<void>
export type ActionChatIdParams = Action<ChatIdParams>
export type Middleware = (ctx: IContext, next: Next) => void
