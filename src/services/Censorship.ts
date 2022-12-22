import prisma from './client'

class Censorship {
    words: string[] = []

    async init() {
        const words = await prisma.censorship.findMany()
        this.words = words.map(({ word }) => word)
    }

    async add(word: string) {
        await prisma.censorship.create({
            data: { word }
        })
        this.words.push(word)
    }

    async remove(word: string) {
        await prisma.censorship.delete({
            where: { word }
        })
        this.words = this.words.filter((w) => w !== word)
    }

    includes(word: string) {
        return this.words.includes(word)
    }
}

const censor = new Censorship()

censor.init()

export default censor
