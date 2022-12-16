import { Composer } from 'telegraf'
import { MyContext } from '../../interfaces'
import getFiles from '../get-files'

const composer = new Composer()
const commandFiles = getFiles(__dirname, '.ts')

commandFiles.forEach(async (commandFile: string) => {
    const { Button } = await import(commandFile)

    if (!Button) {
        return
    }
    const button = new Button()

    composer.hears(button.commands, async (ctx: MyContext) => {
        try {
            if (await button.validation(ctx)) {
                button.callback(ctx)
            }
        } catch ({ message }) {
            await ctx.reply(ctx.i18n.t('error'))
            console.log(`[error]: ${message}`)
        }
    })
})

export default composer
