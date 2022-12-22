import composer from '.'
import queue from '../../services/Queue'
import buttons from '../../buttons.json'
import * as keyboards from '../../keyboards'

composer.hears([buttons.CANCEL_SEARCH], (ctx) => {
    try {
        const chatId = ctx.chat.id

        if (!queue.includes(chatId)) {
            return ctx.reply(
                ctx.i18n.t('user_not_in_search'),
                keyboards.userMenu()
            )
        }

        queue.removeChatId(chatId)

        ctx.reply(ctx.i18n.t('search_canceled'), keyboards.userMenu())
    } catch (message) {
        ctx.reply(ctx.i18n.t('error'))
        console.log(`[error]: ${message}`)
    }
})
