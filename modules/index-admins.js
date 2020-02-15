let admins = process.env.BOT_ADMINS
admins = (admins && admins.split(/\ +/)) || [];

module.exports = bot=> {
    const checkAdmin = (ctx)=> {
        const usr = ctx.from.username
        return admins.includes(usr) ? Promise.resolve() : Promise.reject(process.env.YOU_ARE_NOT_ADMIN);
    }
    
    const catcher = (ctx, ex)=> {
        console.log(ex)
        ctx.replyWithMarkdown(bot.emojify(typeof ex == 'string' ? ex : process.env.SOMETHING_WENT_WRONG))  
    }

    for(const key of ['help', 'backup', 'password', 'kill']) {
        bot.command(key, require(`./admin-${key}.js`)(bot, checkAdmin, catcher))
    }
    bot.command('manager', require('./manager.js')(bot))
    bot.command('test', require('./test.js')(bot))
    bot.on('document',   require('./admin-upload.js')(bot, checkAdmin, catcher))
}
