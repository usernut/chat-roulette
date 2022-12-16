import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'
import { I18n } from '@esindger/telegraf-i18n'
import LocalSession from 'telegraf-session-local'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import { commands, buttons, listeners, actions } from './conrtollers'
import { Rooms } from './services/Rooms'
import { Queue } from './services/Queue'
import { Censorship } from './services/censorship'

dotenv.config()

export const bot = new Telegraf(process.env.TELEGRAM_TOKEN as string)

const i18n = new I18n({
    directory: path.resolve(__dirname, 'locales'),
    defaultLanguage: 'ru',
    defaultLanguageOnMissing: true,
    useSession: true
})

export const client = new PrismaClient()

export const localSession = new LocalSession({
    database: 'sessions.json'
})

export const queue = new Queue()
export const rm = new Rooms()
export const censor = new Censorship()

censor.init()

bot.use(localSession.middleware('session'), i18n.middleware())
bot.use(commands, buttons, listeners, actions)

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
