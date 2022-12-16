import buttons from '../../buttons.json'
import { MyContext } from '../../interfaces'
import * as keyboards from '../../keyboards'
import { bot, localSession, rm } from '../../bot'
import { updateStatsByRoom } from '../../services/stats'
import { Base } from '../command-base'

export class Button extends Base {
    commands = [buttons.END_DIALOG]
    permissions = []

    callback = async (ctx: MyContext) => {
        try {
            const room = rm.findById(ctx.session.room)

            if (!room) {
                return ctx.reply(
                    ctx.i18n.t('user_not_in_dialog'),
                    keyboards.userMenu()
                )
            }

            const [companionId] = room.users.filter(
                (user: number) => user != ctx.message.chat.id
            )

            ctx.session.room = null

            await localSession.saveSession(`${companionId}:${companionId}`, {
                room: null
            })

            bot.telegram.sendMessage(
                companionId,
                ctx.i18n.t('companion_enden_dealogue'),
                keyboards.userMenu()
            )

            await updateStatsByRoom(room)
            rm.removeById(ctx.session.room)

            ctx.reply(ctx.i18n.t('dialogue_ended'), keyboards.userMenu())
        } catch (message) {
            await ctx.reply(ctx.i18n.t('error'))
            console.log(`[error]: ${message}`)
        }
    }
}
