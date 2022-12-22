import { ChatId } from '../types'

class Queue extends Array<ChatId> {
    removeChatId(chatId: ChatId) {
        const index = this.indexOf(chatId)

        if (index !== -1) {
            this.splice(index, 1)
        }
    }
}

export default new Queue()
