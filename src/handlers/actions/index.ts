import { Composer } from 'telegraf'
import getFiles from '../../utils/get-files'
import { Handler, IContext } from '../../interfaces'

const composer = new Composer<IContext>()
const paths = getFiles(__dirname, '.ts')

paths.forEach(async (path) => {
    const { handler }: { handler: Handler } = await import(path)

    if (!handler) return

    composer.action(
        handler.triggers,
        ...(handler.middlewares as []),
        handler.callback
    )
})

export default composer
