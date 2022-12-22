import composer from '.'
import { getUserWithRoleAndStats } from '../../services/user'
import { roles } from '../../middlewares/roles'
import buttons from '../../buttons.json'
import * as keyboards from '../../keyboards'

composer.command(buttons.USER, roles(['ADMIN']), async (ctx) => {
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
        const stats = user.stats
        const banned = ['Нет', 'Да'][+user.isBanned]
        const keyboard = [keyboards.ban(chatId), keyboards.unban(chatId)][
            +user.isBanned
        ]

        ctx.reply(
            ctx.i18n.t('user_stats', { chatId, role, banned, stats }),
            keyboard
        )
    } catch (message) {
        ctx.reply(ctx.i18n.t('error'))
        console.log(`[error]: ${message}`)
    }
})
