import composer from '.'
import rm from '../../services/Rooms'
import { updateStatsByRoom } from '../../services/stats'
import buttons from '../../buttons.json'
import * as keyboards from '../../keyboards'

composer.hears([buttons.END_DIALOG], async (ctx) => {
    try {
        const chatId = ctx.chat.id
        const room = rm.getRoomByChatId(chatId)

        if (!room) {
            return ctx.reply(
                ctx.i18n.t('user_not_in_dialog'),
                keyboards.userMenu()
            )
        }

        await updateStatsByRoom(room)

        ctx.telegram.sendMessage(
            room.companionId,
            ctx.i18n.t('companion_enden_dealogue'),
            keyboards.userMenu()
        )

        ctx.reply(ctx.i18n.t('dialogue_ended'), keyboards.userMenu())
        rm.removeById(room.id)
    } catch (message) {
        ctx.reply(ctx.i18n.t('error'))
        console.log(`[error]: ${message}`)
    }
})
