import buttons from '../../buttons.json'
import { ChatId } from '../../types'
import { banUser, getUser } from '../../services/user'
import * as keyboards from '../../keyboards'
import { Base } from '../command-base'
import { MyContext } from '../../interfaces'

export class Action extends Base {
    commands = buttons.BAN.callback_data
    permissions = ['ADMIN']

    callback = async (ctx: MyContext, params: { chatId: ChatId }) => {
        try {
            const { chatId } = params
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
            await ctx.reply(ctx.i18n.t('error'))
            console.log(`[error]: ${message}`)
        }
    }
}
