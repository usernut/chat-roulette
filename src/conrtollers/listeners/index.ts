import { Composer } from 'telegraf'
import { MyContext } from '../../interfaces'
import getFiles from '../get-files'

const composer = new Composer()
const commandFiles = getFiles(__dirname, '.ts')

commandFiles.forEach(async (commandFile: string) => {
    const { Listener } = await import(commandFile)

    if (!Listener) {
        return
    }
    const listener = new Listener()

    composer.on(listener.commands, async (ctx: MyContext, next) => {
        try {
            if (await listener.validation(ctx)) {
                listener.callback(ctx, next)
            }
        } catch ({ message }) {
            await ctx.reply(ctx.i18n.t('error'))
            console.log(`[error]: ${message}`)
        }
    })
})

export default composer
