import buttons from '../../buttons.json'
import { MyContext } from '../../interfaces'
import { findOrCreateUser } from '../../services/user'
import * as keyboards from '../../keyboards'
import { Base } from '../command-base'

export class Command extends Base {
    commands = [buttons.START]
    permissions = []

    callback = async (ctx: MyContext) => {
        const chatId = ctx.message.chat.id

        if (ctx.session?.room) {
            return ctx.reply(ctx.i18n.t('greeting'), keyboards.userMenu())
        }

        await findOrCreateUser(chatId)

        ctx.reply(ctx.i18n.t('greeting'), keyboards.userMenu())
    }
}
