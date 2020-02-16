const fs       = require('fs')
const emojify  = require('node-emoji').emojify
const bluebird = require('bluebird')
const redis    = require('redis')
const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')

const dict = require('dotenv').config({path: './documents/settings.env'}).parsed
const tg = new Telegram(dict.BOT_TOKEN)
bluebird.promisifyAll(redis.RedisClient.prototype)

class TelegrafExt extends Telegraf {
    constructor(token, withAdmins){
        super(token)
        this.context.redisc   = redis.createClient()
        this.context.emojify  = emojify
        this.context.fromDocs = function(fn, ctx, options){
            let arr = /.*\/([^\/]+)$/.exec(fn)
            if(!arr || !arr[1]) cts.reply('OK')
            fn = arr[1]
            let path = `./documents/${fn.replace(/^doc-/, '').replace(/\.js$/, '.md')}`
            let txt = fs.readFileSync(path, 'utf8')
            txt = txt.split('\n').map(el => {
                if(el.trim() == '<br>') return '\n'
                if(/^\#/.test(el)) return `*${el.replace(/^\#+/, '').toUpperCase()}*`
                let liReg = /^\d+\.\ /
                if(liReg.test(el)) return el.replace(liReg, ':small_orange_diamond: ')
                liReg = /^\*\ /
                if(liReg.test(el)) return el.replace(liReg, ':small_blue_diamond: ')
                return el
            }).join('\n')
            if(!ctx) return emojify(txt)
            ctx.replyWithMarkdown(emojify(txt), options)
        }
        this.context.dbPrefix = process.env['DB_PREFIX']
        this.context.inviteTtl = process.env['INVITE_TTL']
        this.context.catcher = (ctx, ex)=> {
            console.log(ex)
            ctx.replyWithMarkdown(ctx.emojify(typeof ex == 'string' ? ex : process.env.ERR_SOMETHING_WENT_WRONG ))  
        }
        if(withAdmins) require('./index-admins.js')(this, tg)
        require('./index-users.js')(this, tg)
    }
}

module.exports = TelegrafExt
