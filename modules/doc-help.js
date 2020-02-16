module.exports = (bot)=>{
    bot.help((ctx)=>{
        ctx.fromDocs(__filename, ctx, {disable_web_page_preview: true})
    })
}
