const axios = require('axios');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * Отправляет сообщение в Telegram чат
 * @param {string} message - Текст сообщения для отправки
 * @returns {Promise<void>}
 */
exports.sendMessage = async (message) => {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set in environment variables');
      return;
    }
    
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    await axios.post(telegramApiUrl, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
      disable_notification: false
    });
    
    console.log('Message sent to Telegram successfully');
  } catch (error) {
    console.error('Error sending message to Telegram:', error.message);
    if (error.response) {
      console.error('Telegram API response:', error.response.data);
    }
    throw error;
  }
};
