const Telegraf = require('telegraf')
const Markup   = require('telegraf/markup')
const emojify  = require('node-emoji').emojify
const dict     = require('dotenv').config({path: './documents/settings.env'}).parsed

module.exports = class TelegrafExt extends Telegraf {
    constructor(){
        super(dict.BOT_TOKEN)
        const bot = this
        const {context}   = bot
        context.bot       = bot
        context.emojify   = emojify
        context.redisc    = require('./util-redis')
        context.fromDocs  = require('./util-from-docs')
        context.commonAction = require('./util-common-action')
        bot.start(require('./util-listeners')(bot))
        require('./util-bind-events')(bot)
    }
}
