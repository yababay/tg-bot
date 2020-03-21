module.exports = bot=> require('fs').readdir(__dirname, (err, files)=> {
    const dict = process.env
    let admins = dict.BOT_ADMINS
    admins = (admins && admins.split(/\ +/)) || [];
    if (err) return console.log('Unable to scan directory: ' + err);
    files.filter(f => /^admin-/.test(f)).forEach(f => {
        const cmd = require(`./${f}`)
        bot.command(f.replace(/\.js$/, '').replace(/^admin-/, ''), async ctx=> {
            try{
                if(!admins.includes(ctx.from.username)) throw ctx.emojify(dict.ERR_YOU_ARE_NOT_ADMIN)
                await cmd(ctx)
            }
            catch(ex){ctx.reply(ex)}
        })
    });
    files.filter(f => /^action-/.test(f)).forEach(f => {
        bot.action(new RegExp(`^${f.replace(/^action-/, '').replace(/\.js$/, '')}-?(.*)`), require(`./${f}`))
    });
    files.filter(f => /^button-/.test(f)).forEach(f => {
        const key = f.replace(/\.js$/, '').replace(/\-/g, '_').toUpperCase()
        if(!dict[key]) return
        bot.hears(bot.context.emojify(dict[key]), require(`./${f}`))
    });
    files.filter(f => /^user-/.test(f)).forEach(f => {
        require(`./${f}`)(bot)
    });
});

