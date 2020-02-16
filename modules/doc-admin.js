module.exports = (bot, tg, checkAdmin, catcher)=> {
    bot.command('admin', async ctx=> {
        try{
            await checkAdmin(ctx)
            ctx.fromDocs(__filename, ctx, {disable_web_page_preview: true})
        }
        catch(ex){catcher(ctx, ex)}
    })
}


