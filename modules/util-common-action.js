const Markup   = require('telegraf/markup')
const emojify  = require('node-emoji').emojify

module.exports = (label, action)=> action ? [Markup.callbackButton(emojify(label), action)] : [Markup.callbackButton(emojify(label))]

