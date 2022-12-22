import composer from '.'
import buttons from '../../buttons.json'
import * as keyboards from '../../keyboards'

composer.command(buttons.START, (ctx) => {
    try {
        ctx.reply(ctx.i18n.t('greeting'), keyboards.userMenu())
    } catch (message) {
        ctx.reply(ctx.i18n.t('error'))
        console.log(`[error]: ${message}`)
    }
})
