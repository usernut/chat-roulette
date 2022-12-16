import { client } from '../bot'

export class Censorship {
    words: string[] = []

    async init() {
        const words = await client.censorship.findMany()
        this.words = words.map(({ word }) => word)
    }

    async add(word: string) {
        await client.censorship.create({
            data: {
                word
            }
        })
        this.words.push(word)
    }

    async remove(word: string) {
        await client.censorship.delete({
            where: {
                word
            }
        })
        this.words = this.words.filter((w) => w !== word)
    }

    includes(word: string) {
        return this.words.includes(word)
    }
}
