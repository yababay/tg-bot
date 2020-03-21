const Markup   = require('telegraf/markup')
const emojify  = require('node-emoji').emojify
const mainLabels = Object.keys(process.env).filter($=>/^BUTTON_MAIN_/.test($)).map($=> emojify(process.env[$]))
const welcome =  ctx=> ctx.fromDocs('welcome', ctx, Markup.keyboard(mainLabels).oneTime().resize().extra())
const BACK_TO_MAIN   = 'back-to-main'

module.exports = bot=> {
    bot.command('manager', require('./manager'))
    if(process.env.BUTTON_BACK_MAIN){
        bot.context.buttonBackMain  = bot.context.commonAction(process.env.BUTTON_BACK_MAIN, BACK_TO_MAIN)
        bot.action(BACK_TO_MAIN, welcome)
        bot.context.buttonsWithBack = arr=>  Markup.inlineKeyboard([...arr, context.buttonBackMain]).extra()
    }
    return welcome
}

