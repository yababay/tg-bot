const fs = require('fs');
const emojify = require('node-emoji').emojify;
const bluebird = require('bluebird')
const redis    = require('redis')
const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const dict = require('dotenv').config({path: './documents/settings.env'}).parsed
bluebird.promisifyAll(redis.RedisClient.prototype)

const tg = new Telegram(dict.BOT_TOKEN)

Telegraf.prototype['setUtil'] = function(){
    this.context.redisc   = redis.createClient()
    this.context.emojify  = emojify
    this.context.fromDocs = fn => {
        fn = /.*\/([^\/]+)$/
        let path = `./documents/${fn.replace(/^doc-/, '').replace(/\.js$/, '')}`
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
        return emojify(txt)
    }
}

bot.setUserModules = ()=> require('./index-users.js')(bot, tg)
bot.setAdminModules = ()=> require('./index-admins.js')(bot, tg)
