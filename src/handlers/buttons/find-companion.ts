import composer from '.'
import rm from '../../services/Rooms'
import queue from '../../services/Queue'
import { getUser } from '../../services/user'
import buttons from '../../buttons.json'
import * as keyboards from '../../keyboards'

composer.hears([buttons.FIND_COMPANION], async (ctx) => {
    try {
        const chatId = ctx.chat.id

        if (rm.getRoomByChatId(chatId)) {
            return ctx.reply(
                ctx.i18n.t('user_already_in_dialogue'),
                keyboards.exitDialog()
            )
        }

        if (queue.includes(chatId)) {
            return ctx.reply(
                ctx.i18n.t('user_already_in_search'),
                keyboards.cancelSearch()
            )
        }

        const user = await getUser(chatId)

        if (user?.isBanned) {
            return ctx.reply(ctx.i18n.t('search_blocked_user_banned'))
        }

        if (queue.length > 0) {
            const companionId = queue.pop()
            rm.create(ctx, [chatId, companionId])
        } else {
            queue.push(chatId)
            ctx.reply(ctx.i18n.t('search_companion'), keyboards.cancelSearch())
        }
    } catch (message) {
        ctx.reply(ctx.i18n.t('error'))
        console.log(`[error]: ${message}`)
    }
})
