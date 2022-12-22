import buttons from './buttons.json'
import { ChatId } from './types'

export const exitDialog = () => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [[buttons.END_DIALOG]]
    }
})

export const cancelSearch = () => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [[buttons.CANCEL_SEARCH]]
    }
})

export const userMenu = () => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [[buttons.FIND_COMPANION], [buttons.MY_STATS]]
    }
})

export const ban = (chatId: ChatId) => ({
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: buttons.BAN.text,
                    callback_data: JSON.stringify({
                        action: buttons.BAN.callback_data,
                        params: { chatId }
                    })
                }
            ]
        ]
    }
})

export const unban = (chatId: ChatId) => ({
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: buttons.UNBAN.text,
                    callback_data: JSON.stringify({
                        action: buttons.UNBAN.callback_data,
                        params: { chatId }
                    })
                }
            ]
        ]
    }
})
