const telegramService = require('../services/telegramService');

exports.registerDevice = async (req, res) => {
  try {
    const { device_id, model, sim_operator, sim_numbers } = req.body;
    
    if (!device_id || !model) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Подготовка сообщения для Telegram
    const message = `🟢 Новое устройство:\nID устройства: ${device_id}\nМодель: ${model}\nОператор SIM: ${sim_operator} - ${
      Array.isArray(sim_numbers) ? sim_numbers.join(', ') : sim_numbers
    }`;
    
    // Отправка уведомления в Telegram
    await telegramService.sendMessage(message);
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error registering device:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
