import composer from '.'
import { getStatsByChatId } from '../../services/stats'
import buttons from '../../buttons.json'

composer.hears([buttons.MY_STATS], async (ctx) => {
    try {
        const chatId = ctx.chat.id

        const stats = await getStatsByChatId(chatId)
        const [{ totalMessages, totalCompanions }] = stats

        ctx.reply(
            ctx.i18n.t('user_own_stats', {
                totalMessages,
                totalCompanions
            })
        )
    } catch (message) {
        ctx.reply(ctx.i18n.t('error'))
        console.log(`[error]: ${message}`)
    }
})
