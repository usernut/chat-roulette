import { callbackQuery } from 'telegraf/filters'
import { IContext } from '../interfaces'
import { ActionChatIdParams } from '../types'

export const getCallbackQueryData = (ctx: IContext) => {
    if (!ctx.has(callbackQuery('data'))) {
        return
    }

    const data: ActionChatIdParams = JSON.parse(ctx.callbackQuery.data)

    return data
}
