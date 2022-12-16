import buttons from '../../buttons.json'
import { MyContext } from '../../interfaces'
import { getStatsByChatId } from '../../services/stats'
import { Base } from '../command-base'

export class Button extends Base {
    commands = [buttons.MY_STATS]
    permissions = []

    callback = async (ctx: MyContext) => {
        const chatId = ctx.message.chat.id

        const stats = await getStatsByChatId(chatId)
        const [{ total_messages, total_companions }] = stats

        ctx.reply(
            ctx.i18n.t('user_own_stats', { total_messages, total_companions })
        )
    }
}
