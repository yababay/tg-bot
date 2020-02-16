const fs = require('fs');
let admins = process.env.BOT_ADMINS
admins = (admins && admins.split(/\ +/)) || [];

const checkAdmin = (ctx)=> {
    const usr = ctx.from.username
    return admins.includes(usr) ? Promise.resolve() : Promise.reject(process.env.ERR_YOU_ARE_NOT_ADMIN );
}

const catcher = (ctx, ex)=> {
    console.log(ex)
    ctx.replyWithMarkdown(ctx.emojify(typeof ex == 'string' ? ex : process.env.ERR_SOMETHING_WENT_WRONG ))  
}

module.exports = (bot, tg) => {
    fs.readdir(__dirname, (err, files)=> {
        if (err) return console.log('Unable to scan directory: ' + err);
        files.filter(f => /^doc\-admin/.test(f)).forEach(f => {
            require(`./${f}`)(bot, tg, checkAdmin, catcher)
        });
    });
    bot.on('document', require('./upload.js')(bot, tg, checkAdmin, catcher))
}
