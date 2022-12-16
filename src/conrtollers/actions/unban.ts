import buttons from '../../buttons.json'
import { ChatId } from '../../types'
import { unbanUser, getUser } from '../../services/user'
import * as keyboards from '../../keyboards'
import { Base } from '../command-base'
import { MyContext } from '../../interfaces'

export class Action extends Base {
    commands = buttons.UNBAN.callback_data
    permissions = ['ADMIN']

    callback = async (ctx: MyContext, params: { chatId: ChatId }) => {
        const { chatId } = params
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
    }
}
