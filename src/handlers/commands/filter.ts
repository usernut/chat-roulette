import composer from '.'
import censor from '../../services/Censorship'
import { roles } from '../../middlewares/roles'
import buttons from '../../buttons.json'

composer.command(buttons.FILTER, roles(['ADMIN']), async (ctx) => {
    try {
        const word = ctx.message.text.trim().split(' ')[1]

        if (!word) {
            const words =
                censor.words.join(', ') || ctx.i18n.t('filter_has_no_words')
            return ctx.reply(ctx.i18n.t('filter_help', { words }))
        }

        if (censor.includes(word)) {
            await censor.remove(word)
            return ctx.reply(ctx.i18n.t('filter_word_deleted', { word }))
        }

        censor.add(word)
        ctx.reply(ctx.i18n.t('filter_word_added', { word }))
    } catch (message) {
        ctx.reply(ctx.i18n.t('error'))
        console.log(`[error]: ${message}`)
    }
})
