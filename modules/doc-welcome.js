module.exports = (bot)=>{
    bot.start((ctx)=>{
        ctx.fromDocs(__filename, ctx, ctx.keyboard.oneTime().resize().extra())
    })
}
