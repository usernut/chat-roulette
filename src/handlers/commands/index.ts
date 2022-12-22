import { Composer } from 'telegraf'
import { IContext } from '../../interfaces'
import getFiles from '../../utils/get-files'

const composer = new Composer<IContext>()
const paths = getFiles(__dirname, '.ts')

paths.forEach(async (path) => await import(path))

export default composer
