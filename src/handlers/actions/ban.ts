import { banUser, getUser } from '../../services/user'
import { roles } from '../../middlewares/roles'
import { toActionTrigger } from '../../utils/to-action-trigger'
import { getCallbackQueryData } from '../../utils/get-callback-query-data'
import buttons from '../../buttons.json'
import * as keyboards from '../../keyboards'
import { Handler, IContext } from '../../interfaces'

export const handler: Handler = {
    triggers: toActionTrigger(buttons.BAN.callback_data),
    middlewares: [roles(['ADMIN'])],

    callback: async (ctx: IContext) => {
        try {
            const data = getCallbackQueryData(ctx)

            if (!data) return
            // chatId to be banned
            const { chatId } = data.params

            const user = await getUser(chatId)

            if (user?.isBanned) {
                ctx.answerCbQuery()
                ctx.reply(ctx.i18n.t('user_already_banned', { chatId }))
                return
            }

            await banUser(chatId)

            ctx.editMessageReplyMarkup(keyboards.unban(chatId).reply_markup)
            ctx.reply(ctx.i18n.t('user_banned', { chatId }))
            ctx.answerCbQuery()
        } catch (message) {
            ctx.reply(ctx.i18n.t('error'))
            console.log(`[error]: ${message}`)
        }
    }
}
