DIR=`pwd`../
NODE=`/usr/bin/env node`

TG=`ps ax | grep '[t]g-bot.js'`

if [ -z "$TG" ]; then
    cd $DIR && $NODE ./tg-bot.js 1>debug.log 2>errors.log &
fi
