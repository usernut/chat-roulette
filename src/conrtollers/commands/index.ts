import { Composer } from 'telegraf'
import { MyContext } from '../../interfaces'
import getFiles from '../get-files'

const composer = new Composer()
const commandFiles = getFiles(__dirname, '.ts')

commandFiles.forEach(async (commandFile: string) => {
    const { Command } = await import(commandFile)

    if (!Command) {
        return
    }
    const command = new Command()

    composer.command(command.commands, async (ctx: MyContext) => {
        try {
            if (await command.validation(ctx)) {
                command.callback(ctx)
            }
        } catch ({ message }) {
            await ctx.reply(ctx.i18n.t('error'))
            console.log(`[error]: ${message}`)
        }
    })
})

export default composer
