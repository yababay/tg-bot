Админы этого бота имеют право выгружать документы, на основе которых формируются настройки и пользовательские сообщения. Чтобы дать пользователю Telegram права админа, добавьте его имя в соответствующую строку файла `settings.env`:

`SET_ADMINS = ivan_123 coolhacker bill_gates` 

Файл `settings.env` содержит и другие настройки. Его можно править любым текстовым редактором (Блокнот, Notepad++, Vim, VSCode и т.д.).  Его, а также файлы, содержащие пользовательские сообщения (приветствие, FAQ, инструкции и т.п.) можно загрузить на свой локальный компьютер и править там, а потом вновь выгружать через бота на хост. Zip-архив с документами можно получить с помощью команды: 

`/backup`

Полученный архив следует распаковать на локальный жесткий диск, а затем править в соответствии с логикой работы бота. Выгружать в бот правленные тексты следует с помощью "скрепки" (слева от строки ввода в клиенте Telegram). Для правки лучше использовать редактор, поддерживающий синтаксис markdown и кодировку utf-8 (например, Notepad++). Документы можно форматировать в соответствии с правилами [markdown](https://docs.microsoft.com/ru-ru/contribute/how-to-write-use-markdown) и украшать [эмодзи](https://www.webfx.com/tools/emoji-cheat-sheet/).

Чтобы назначить менеджера, которому будут приходить заказы, введите 

`/password`

Сгенерированный пароль следует отправить пользователю Телеграм, назначенному менеджером. Он должен будет ввести

`/manager <полученный пароль>`

См. инструкцию по команде `/password`.

Обновление базы данных производится по расписанию `crontab`. Чтобы обновить базу вручную введите 

`/update`
