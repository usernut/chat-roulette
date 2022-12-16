import { getRole } from '../services/user'
import { MyContext } from '../interfaces'

export class Base {
    commands: string | string[] = ''
    permissionError = 'dont_have_permissions'
    permissions: string | string[] = []

    validation = async (ctx: MyContext): Promise<boolean> => {
        if (!this.permissions.length) {
            return true
        }

        if (typeof this.permissions === 'string') {
            this.permissions = [this.permissions]
        }

        const chatId =
            ctx.message?.chat?.id || ctx.callbackQuery?.message?.chat?.id

        const { role } = await getRole(chatId)
        // все мы не идеальны
        if (this.permissions.includes(role?.role)) {
            return true
        }

        await ctx.reply(ctx.i18n.t(this.permissionError))
        return false
    }
}
