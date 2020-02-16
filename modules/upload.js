const fs = require('fs')
const fetch = require('node-fetch')
const request = require('request')

const tgApi = req => {
    let url = `https:\/\/api.telegram.org/bot${process.env.BOT_TOKEN}/${req}`
    return fetch(url)
	.then(res=> res.json())
}

module.exports = (bot, tg, checkAdmin, catcher)=> {
    return async ctx=> {
        try{
            await checkAdmin(ctx)
            const {file_name, file_id, file_size} = ctx.update.message.document
            if(file_size > 51200) throw process.env.ERR_TOO_LARGE
            if(!/.*\.(md|env)$/.test(file_name)) throw process.env.ERR_MD_ONLY
            const obj = await tgApi(`getFile?file_id=${file_id}`)
            const url = `https:\/\/api.telegram.org/file/bot${process.env.BOT_TOKEN}/${obj.result.file_path}`
            request(url).pipe(fs.createWriteStream(`${__filename.replace(/[^\/]+$/, '../documents/')}${file_name}`))
        }
        catch(ex){catcher(ctx, ex)}
    }
}

