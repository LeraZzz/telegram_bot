import TelegramBot from 'node-telegram-bot-api'

let tg

function create () {
  const token = "387016243:AAEXimznXpHl5ke6qpUanexj_Wm9mH79y_s"
  tg = new TelegramBot(token, {
    polling: true
  })
  tg.on('message', onMessage)
  tg.on('callback_query', onCallbackQuery)
}

function onMessage (message) {
  console.log('message:', message)
  if (message.text && message.text.toLowerCase() === 'ping') {
    tg.sendMessage(message.chat.id, '<pre>pong</pre>', {
      parse_mode: 'HTML'
    })
    return
  }
  //
  if (message.text && message.text.toLowerCase() === '/start') {
    sendStartMessage(message)
    return
  }
}

function onCallbackQuery (callbackQuery) {
  console.log('callbackQuery:', callbackQuery)
  if (callbackQuery.data === 'helpCmd') {
    const helpText = "Tonight game will be very hot"
    tg.sendMessage(callbackQuery.message.chat.id, helpText)
    tg.answerCallbackQuery(callbackQuery.id)
  } else if (callbackQuery.data === 'gameCmd') {
    const helpText = "Take off the t-shirt, make photo and send it to ur girlfriend"
    tg.sendMessage(callbackQuery.message.chat.id, helpText)
    tg.answerCallbackQuery(callbackQuery.id)
  }
}

// *********************************************
function sendStartMessage (message) {
  const text = 'Hello, my dear Mitya'
  //
  const helpButton = {
    text: "Об игре",
    callback_data: 'helpCmd'
  }
  //
  const gameButton = {
    text: "Начать игру",
    callback_data: 'gameCmd'
  }
  //
  const options = {}
  options.reply_markup = {}
  options.reply_markup.inline_keyboard = []
  options.reply_markup.inline_keyboard.push([helpButton])
  options.reply_markup.inline_keyboard.push([gameButton])
  tg.sendMessage(message.chat.id, text, options)
}

export default create