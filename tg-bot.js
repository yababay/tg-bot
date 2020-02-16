#!/usr/bin/end ode

const {bot} = require('./modules')
bot.setRedisc()
bot.setUserModules()
bot.setAdminModules()
bot.startPolling()

