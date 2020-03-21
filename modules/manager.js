module.exports = async (ctx)=>{
    const {redisc} = ctx
    const pass = await redisc.hgetAsync(`${process.env.DB_PREFIX}:manager`, 'password')
    const arr = /.*\s([^\s]+)$/.exec(ctx.message.text)
    if(pass != ((arr && arr[1]) || new Date().toString())) return ctx.reply(process.env.ERR_BAD_MANAGER)
    await redisc.hsetAsync(`${process.env.DB_PREFIX}:manager`, 'uid', ctx.from.id)
    ctx.replyWithMarkdown(ctx.fromDocs(__filename))
}
