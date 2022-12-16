import fs from 'fs'

const getFiles = (dir: string, suffix = '.ts'): string[] => {
    const files = fs.readdirSync(dir, {
        withFileTypes: true
    })

    let commandFiles: string[] = []

    for (const file of files) {
        if (file.name.startsWith('index')) {
            continue
        }

        if (file.isDirectory()) {
            commandFiles = [
                ...commandFiles,
                ...getFiles(`${dir}/${file.name}`, suffix)
            ]
        } else if (file.name.endsWith(suffix)) {
            commandFiles.push(`${dir}/${file.name}`)
        }
    }

    return commandFiles
}

export default getFiles
