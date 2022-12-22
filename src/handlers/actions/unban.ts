import { unbanUser, getUser } from '../../services/user'
import { roles } from '../../middlewares/roles'
import { toActionTrigger } from '../../utils/to-action-trigger'
import { getCallbackQueryData } from '../../utils/get-callback-query-data'
import buttons from '../../buttons.json'
import * as keyboards from '../../keyboards'
import { Handler, IContext } from '../../interfaces'

export const handler: Handler = {
    triggers: toActionTrigger(buttons.UNBAN.callback_data),
    middlewares: [roles(['ADMIN'])],

    callback: async (ctx: IContext) => {
        try {
            const data = getCallbackQueryData(ctx)

            if (!data) return
            // chatId user to be unbanned
            const { chatId } = data.params

            const user = await getUser(chatId)

            if (!user?.isBanned) {
                ctx.answerCbQuery()
                ctx.reply(ctx.i18n.t('user_not_banned', { chatId }))
                return
            }

            await unbanUser(chatId)

            ctx.editMessageReplyMarkup(keyboards.ban(chatId).reply_markup)
            ctx.reply(ctx.i18n.t('user_unbanned', { chatId }))
            ctx.answerCbQuery()
        } catch (message) {
            ctx.reply(ctx.i18n.t('error'))
            console.log(`[error]: ${message}`)
        }
    }
}
