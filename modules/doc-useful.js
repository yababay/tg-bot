const {getBackStack} = require('./_labels.js')

module.exports = (bot)=>{
    return (ctx)=>{
        ctx.replyWithMarkdown(bot.mdr(__filename), {disable_web_page_preview: true})
    }
}


