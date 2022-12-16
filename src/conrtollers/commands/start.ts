import buttons from '../../buttons.json'
import { MyContext } from '../../interfaces'
import { findOrCreateUser } from '../../services/user'
import * as keyboards from '../../keyboards'
import { Base } from '../command-base'

export class Command extends Base {
    commands = [buttons.START]
    permissions = []

    callback = async (ctx: MyContext) => {
        try {
            ctx.reply(ctx.i18n.t('greeting'), keyboards.userMenu())
        } catch (message) {
            await ctx.reply(ctx.i18n.t('error'))
            console.log(`[error]: ${message}`)
        }
    }
}
