# Template for Telegram bot based on Telegraf API

Шаблон Телеграм-бота на основе API Telegtaf с акцентом на то, чтобы максимально сократить объем работ по программированию за счет конфигурирования:

* Сообщения бота формируются на основе md-файлов (см. documents). Их можно закреплять за обработчиками событий. 
* Меню формируется на основе переменных окружения. 
* Настройки и шаблоны сообщений можно выгружать в каталог documents "скрепкой". 
* Утилита watchdog.sh проверяет наличие бота среди процессов по Cron'у и при необходимости перезапускает его. 
* Осуществляется проверка на наличие у пользователя админских прав.

