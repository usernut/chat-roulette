import buttons from '../../buttons.json'
import { MyContext } from '../../interfaces'
import * as keyboards from '../../keyboards'
import { queue } from '../../bot'
import { Base } from '../command-base'

export class Button extends Base {
    commands = [buttons.CANCEL_SEARCH]
    permissions = []

    callback = async (ctx: MyContext) => {
        try {
            const chatId = ctx.message.chat.id

            if (!queue.includes(chatId)) {
                return ctx.reply(
                    ctx.i18n.t('user_not_in_search'),
                    keyboards.userMenu()
                )
            }

            queue.removeChatId(chatId)

            ctx.reply(ctx.i18n.t('search_canceled'), keyboards.userMenu())
        } catch (message) {
            await ctx.reply(ctx.i18n.t('error'))
            console.log(`[error]: ${message}`)
        }
    }
}
