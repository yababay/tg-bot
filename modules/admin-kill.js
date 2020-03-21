const {exec} = require('child_process')

module.exports = async ctx=> {
    exec('echo `ps ax | grep [n]ode.*calibuds.js`', (e, stdout, stderr)=> {
        let out = /^(\d+)[^\d].*/.exec(stdout.toString('utf-8').trim())
        ctx.replyWithMarkdown('Бот остановлен. Его перезагрузка произойдет в течение одной минуты.')
        setTimeout(()=> exec(`kill ${out[1]}`), 2000)
    })
}
