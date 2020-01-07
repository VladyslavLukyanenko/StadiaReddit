const Telegraf = require('telegraf')

class Telegram {
    constructor(token) {
        this.bot = new Telegraf(token)
        this.bot.launch();
    }
    sendMessage(chatId, text){
        this.bot.telegram.sendMessage(chatId, text)
    }
}
module.exports = Telegram;