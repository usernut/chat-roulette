import path from 'path'
import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'
import { I18n } from '@esindger/telegraf-i18n'
import LocalSession from 'telegraf-session-local'
import { commands, buttons, listeners, actions } from './handlers'
import { checkUser } from './middlewares/check-user'
import { IContext } from './interfaces'

dotenv.config()

if (!process.env.BOT_TOKEN) {
    throw new TypeError('BOT_TOKEN must be provided!')
}

const bot = new Telegraf<IContext>(process.env.BOT_TOKEN)

const i18n = new I18n({
    directory: path.resolve(__dirname, 'locales'),
    defaultLanguage: 'ru',
    defaultLanguageOnMissing: true,
    useSession: true
})

const localSession = new LocalSession({
    database: 'sessions.json'
})

bot.use(localSession.middleware('session'))
bot.use(checkUser)
bot.use(i18n.middleware())

bot.use(commands, buttons, listeners, actions)

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
