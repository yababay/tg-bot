#!/usr/bin/env node

const Telegraf = require('./modules')
new Telegraf(process.env.BOT_TOKEN, true).startPolling()

