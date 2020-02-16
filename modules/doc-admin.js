module.exports = (bot, tg, checkAdmin)=> {
    bot.command('admin', async ctx=> {
        const {catcher} = bot.context
        try{
            await checkAdmin(ctx)
            ctx.fromDocs(__filename, ctx, {disable_web_page_preview: true})
        }
        catch(ex){catcher(ctx, ex)}
    })
}


