const passGen = require('generate-password')

module.exports = async ctx=> {
    const {redisc} = ctx
    const pass = passGen.generate({length: 10, numbers: true})
    await redisc.hsetAsync(`${process.env.DB_PREFIX}:manager`, 'password', pass)
    const reply = `${process.env.TEXT_NEW_PASSWORD} - *${pass}* .\n\n` + ctx.fromDocs(__filename)
    ctx.replyWithMarkdown(reply, {disable_web_page_preview: true})
}
