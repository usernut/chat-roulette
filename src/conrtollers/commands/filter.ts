import buttons from '../../buttons.json'
import { MyContext } from '../../interfaces'
import { censor } from '../../bot'
import { Base } from '../command-base'

export class Command extends Base {
    commands = [buttons.FILTER]
    permissions = ['ADMIN']

    callback = async (ctx: MyContext) => {
        try {
            const word = ctx.message.text.trim().split(' ')[1]

            if (!word) {
                const words = censor.words.join(', ') || 'Список пуст'
                return ctx.reply(ctx.i18n.t('filter_help', { words }))
            }

            if (censor.includes(word)) {
                await censor.remove(word)
                ctx.reply(ctx.i18n.t('filter_word_deleted', { word }))
                return
            }

            censor.add(word)
            ctx.reply(ctx.i18n.t('filter_word_added', { word }))
        } catch (message) {
            await ctx.reply(ctx.i18n.t('error'))
            console.log(`[error]: ${message}`)
        }
    }
}
