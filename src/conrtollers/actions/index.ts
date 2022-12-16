import { Composer } from 'telegraf'
import getFiles from '../get-files'
import { MyContext } from '../../interfaces'

const composer = new Composer()
const commandFiles = getFiles(__dirname)

const actions = {}

commandFiles.forEach(async (commandFile: string) => {
    const { Action } = await import(commandFile)

    const action = new Action()
    const commands = action.commands

    if (!commands) {
        return
    }

    if (Array.isArray(commands)) {
        commands.forEach((c) => (actions[c] = action))
        return
    }

    actions[commands] = action
})

composer.on('callback_query', async (ctx: MyContext) => {
    try {
        const data = ctx?.callbackQuery?.['data']

        if (!data) {
            return
        }

        const { callback_data, params } = JSON.parse(data)
        const action = actions[callback_data]

        if (!(await action.validation(ctx))) {
            return
        }

        action.callback(ctx, params)
    } catch (message) {
        await ctx.reply(ctx.i18n.t('error'))
        console.log(`[error]: ${message}`)
    }
})

export default composer
