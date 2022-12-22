import { IContext } from '../interfaces'
import { getRole } from '../services/user'
import { Next } from '../types'

export const roles = (roles: string[]) => async (ctx: IContext, next: Next) => {
    try {
        if (!roles.length) {
            return next()
        }

        if (typeof roles === 'string') {
            roles = [roles]
        }

        const chatId = ctx.chat.id

        const user = await getRole(chatId)

        if (roles.includes(user?.role?.role)) {
            return next()
        }

        ctx.reply(ctx.i18n.t('dont_have_permissions'))
    } catch ({ message }) {
        ctx.reply(ctx.i18n.t('error'))
    }
}
