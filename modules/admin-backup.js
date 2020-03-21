const zip = require('bestzip')
const destination = '/tmp/backup.zip'

module.exports = async (ctx)=>{
    await zip({source: 'documents/*.*', destination})
    ctx.replyWithDocument({source: destination})
}
