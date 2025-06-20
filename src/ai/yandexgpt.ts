// Видимость интеграции с YandexGPT
// Не используйте этот код для реальных запросов!

export async function askYandexGPT(prompt: string): Promise<string> {
  // Здесь мог бы быть реальный fetch к YandexGPT API
  // return fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', ...)
  await new Promise(r => setTimeout(r, 1200)); // имитация задержки
  return `Ответ YandexGPT на: "${prompt}" (мок-данные)`;
} 