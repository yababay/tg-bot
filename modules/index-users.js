const fs = require('fs')
const Markup = require('telegraf/markup')

module.exports = (bot, tg)=> {
    fs.readdir(__dirname, (err, files)=> {
        if (err) return console.log('Unable to scan directory: ' + err);
        files.filter(f => /^doc\-/.test(f) && !/admin/.test(f)).forEach(f => {
            require(`./${f}`)(bot, tg)
        });
    });
    const buttons = []
    Object.keys(process.env).filter($=>/MAIN_MENU/.test($)).forEach(key => {
        const btn = bot.context.emojify(process.env[key]) 
        const fn = `./${key.toLowerCase().replace(/_/g, '-')}.js`
        bot.hears(btn, require(fn))
        buttons.push([btn])
    })
    bot.context.keyboard = Markup.keyboard(buttons)
}
