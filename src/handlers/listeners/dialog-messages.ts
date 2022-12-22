import composer from '.'
import rm from '../../services/Rooms'
import censor from '../../services/Censorship'

composer.on('text', (ctx, next) => {
    try {
        const chatId = ctx.chat.id
        let text = ctx.message.text
        const room = rm.getRoomByChatId(chatId)

        if (!room) {
            return next()
        }

        censor.words.forEach((w) => {
            const searchValue = new RegExp(w, 'gi')
            const replaceValue = '*'.repeat(w.length)
            text = text.replace(searchValue, replaceValue)
        })

        rm.incrementMessageCountById(room.id)

        ctx.telegram.sendMessage(room.companionId, text)
    } catch (message) {
        ctx.reply(ctx.i18n.t('error'))
        console.log(`[error]: ${message}`)
    }
})
