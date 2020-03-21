const fs = require('fs')
const emojify  = require('node-emoji').emojify

module.exports = (fn, ctx, options)=> {
    const path = `./documents/${/\.js$/.test(fn) && /.*\/([^\/]+)\.js$/.exec(fn)[1] || fn}.md`
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

