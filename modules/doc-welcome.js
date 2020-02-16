const {mainKeyboard} = require('./_labels.js')

module.exports = (bot)=>{
    bot.start((ctx)=>{
        ctx.replyWithMarkdown(bot.mdr(__filename), mainKeyboard)
    })
}
