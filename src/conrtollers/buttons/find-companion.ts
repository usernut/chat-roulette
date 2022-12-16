import buttons from '../../buttons.json'
import { MyContext } from '../../interfaces'
import { getUser } from '../../services/user'
import * as keyboards from '../../keyboards'
import { queue, rm } from '../../bot'
import { Base } from '../command-base'

export class Button extends Base {
    commands = [buttons.FIND_COMPANION]
    permissions = []

    callback = async (ctx: MyContext) => {
        try {
            const chatId = ctx.message.chat.id

            if (ctx.session.room) {
                return ctx.reply(
                    ctx.i18n.t('user_already_in_dialogue'),
                    keyboards.exitDialog()
                )
            }

            if (queue.includes(chatId)) {
                return ctx.reply(ctx.i18n.t('user_already_in_search'))
            }

            const { isBanned } = await getUser(chatId)

            if (isBanned) {
                return ctx.reply(ctx.i18n.t('search_blocked_user_banned'))
            }

            if (queue.length() >= 1) {
                const companionId = queue.pop()
                rm.create(ctx, [chatId, companionId])
            } else {
                queue.push(chatId)
                ctx.reply(
                    ctx.i18n.t('search_companion'),
                    keyboards.cancelSearch()
                )
            }
        } catch (message) {
            await ctx.reply(ctx.i18n.t('error'))
            console.log(`[error]: ${message}`)
        }
    }
}
