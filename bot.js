function startBot () {
    console.log("my bot app");
    process.title = "MyTestBot"
    process.on('uncaughtException', function(error) {
        log.add('Упс, произошла непредвиденная ошибка: '+error.stack);
        console.error(error.stack);
        return false;
    });
    var TelegramBot = require('node-telegram-bot-api');
    var tg;
    function create() {
        var token = "387016243:AAEXimznXpHl5ke6qpUanexj_Wm9mH79y_s";
        tg = new TelegramBot(token, {
            polling: true
        });
        tg.on('message', onMessage);
        tg.on('callback_query', onCallbackQuery);
    }
    function onMessage(message) {
        console.log('message:', message);
        if (message.text && message.text.toLowerCase() == 'ping') {
            tg.sendMessage(message.chat.id, '<pre>pong</pre>', {
                parse_mode:'HTML'
            });
            return;
        }
        //
        if (message.text && message.text.toLowerCase() == '/start') {
            sendStartMessage(message);
            return;
        }
    }
    function onCallbackQuery(callbackQuery) {
        console.log('callbackQuery:', callbackQuery);
        if (callbackQuery.data == 'helpCmd') {
            var helpText = "какой то текст об игре";
            tg.sendMessage(callbackQuery.message.chat.id, helpText);
            tg.answerCallbackQuery(callbackQuery.id);
        } else if (callbackQuery.data == 'gameCmd') {
            // стартуем нашу игру
        }
    }
    // *********************************************
    function sendStartMessage(message) {
        var text = 'Добро пожаловать в нашу супер-пупер игру';
        //
        var helpButton = {
            text:"Об игре",
            callback_data:'helpCmd'
        }
        //
        var gameButton = {
            text:"Начать игру",
            callback_data:'gameCmd'
        }
        //
        var options = {};
        options.reply_markup = {};
        options.reply_markup.inline_keyboard = [];
        options.reply_markup.inline_keyboard.push([helpButton]);
        options.reply_markup.inline_keyboard.push([gameButton]);
        tg.sendMessage(message.chat.id, text, options);
    }
    create();
    
}

module.exports = startBot