import { rm, censor, bot } from '../../bot'
import { MyContext } from '../../interfaces'
import { Base } from '../command-base'

export class Listener extends Base {
    commands = ['text']
    permissions = []

    callback = async (ctx: MyContext, next) => {
        try {
            if (!ctx.session.room) {
                return next()
            }

            let text = ctx.message.text
            const room = rm.findById(ctx.session.room)

            if (!room) {
                return next()
            }

            censor.words.forEach((w) => {
                const searchValue = new RegExp(w, 'gi')
                const replaceValue = '*'.repeat(w.length)
                text = text.replace(searchValue, replaceValue)
            })

            const [companionId] = room.users.filter(
                (user) => user != ctx.message.chat.id
            )

            room.messageCount++
            bot.telegram.sendMessage(companionId, text)
        } catch (message) {
            await ctx.reply(ctx.i18n.t('error'))
            console.log(`[error]: ${message}`)
        }
    }
}
