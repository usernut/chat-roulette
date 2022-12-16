import buttons from '../../buttons.json'
import { MyContext } from '../../interfaces'
import * as keyboards from '../../keyboards'
import { getUserWithRoleAndStats } from '../../services/user'
import { Base } from '../command-base'

export class Command extends Base {
    commands = [buttons.USER]
    permissions = ['ADMIN']

    callback = async (ctx: MyContext) => {
        try {
            const chatId = +ctx.message.text.split(' ')[1]

            if (!Number.isInteger(chatId)) {
                return ctx.reply(ctx.i18n.t('user_command_inctorrect_value'))
            }

            const user = await getUserWithRoleAndStats(chatId)

            if (!user) {
                return ctx.reply(ctx.i18n.t('user_not_found'))
            }

            const role = user?.role?.role || ctx.i18n.t('user_without_role')
            const stats = user.stats[0]
            const banned = ['Нет', 'Да'][+user.isBanned]
            const keyboard = [keyboards.ban(chatId), keyboards.unban(chatId)][
                +user.isBanned
            ]

            ctx.reply(
                ctx.i18n.t('user_stats', { chatId, role, banned, stats }),
                keyboard
            )
        } catch (message) {
            await ctx.reply(ctx.i18n.t('error'))
            console.log(`[error]: ${message}`)
        }
    }
}
