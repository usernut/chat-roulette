import { ChatId } from '../types'

export class Queue {
    queue: number[] = []

    pop() {
        return this.queue.pop()
    }

    includes(chatId: ChatId) {
        return this.queue.includes(chatId)
    }

    length() {
        return this.queue.length
    }

    push(chatId: ChatId) {
        this.queue.push(chatId)
    }

    removeChatId(chatId: ChatId) {
        this.queue = this.queue.filter((n) => n !== chatId)
    }
}
