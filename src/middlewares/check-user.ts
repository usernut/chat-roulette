import { IContext } from '../interfaces'
import { findOrCreateUser } from '../services/user'
import { Next } from '../types'

export const checkUser = async (ctx: IContext, next: Next) => {
    try {
        const chatId = ctx.chat.id

        if (!ctx.session.hasOwnProperty('checked')) {
            await findOrCreateUser(chatId)
            ctx.session.checked = true
        }

        next()
    } catch ({ message }) {
        ctx.reply(ctx.i18n.t('error'))
    }
}
