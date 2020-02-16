const {getBackStack} = require('./_labels.js')

module.exports = (bot)=>{
    return (ctx)=>{
        ctx.replyWithMarkdown(bot.mdr(__filename), getBackStack('main'))
    }
}
