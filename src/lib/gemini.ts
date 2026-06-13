export async function classifyComplaint(text: string, apiKey: string) {
  if (!apiKey) {
    return fallbackClassification(text);
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Ты AI-классификатор городских жалоб.
Тебе дают текст жалобы.
Определи Категорию, Приоритет, Департамент и Улицу/Адрес (если указано в тексте).

Категории: Дороги, Мусор, Освещение, Водоснабжение, Безопасность, Другое.
Приоритеты: Высокий, Средний, Низкий.

Текст жалобы: "${text}"

Верни ТОЛЬКО валидный JSON:
{
  "category": "Название",
  "department": "Департамент",
  "priority": "Высокий" | "Средний" | "Низкий",
  "address": "Название улицы/аллеи или 'Адрес не указан'"
}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(resultText);
  } catch (error) {
    console.error("Gemini classification failed:", error);
    return fallbackClassification(text);
  }
}

function fallbackClassification(text: string) {
  const lower = text.toLowerCase();
  
  // Try to extract a simple address if words like "улица", "ул", "аллея", "проспект" are used
  let address = "Адрес не указан";
  const addressMatch = lower.match(/(?:ул\.|улица|проспект|аллея|пр\.)\s+([а-яА-Я0-9-]+)/i);
  if (addressMatch) {
    address = addressMatch[0];
  }
  
  if (lower.includes('дорог') || lower.includes('ям') || lower.includes('асфальт')) {
    return { category: 'Дороги', department: 'Управление дорог', priority: 'Средний', address };
  }
  if (lower.includes('мусор') || lower.includes('гряз') || lower.includes('свалк')) {
    return { category: 'Мусор', department: 'Служба санитарии', priority: 'Низкий', address };
  }
  if (lower.includes('свет') || lower.includes('освещен') || lower.includes('ламп')) {
    return { category: 'Освещение', department: 'Служба ЖКХ', priority: 'Средний', address };
  }
  if (lower.includes('вод') || lower.includes('труб') || lower.includes('затоп')) {
    return { category: 'Водоснабжение', department: 'Водоканал', priority: lower.includes('затоп') ? 'Высокий' : 'Средний', address };
  }
  if (lower.includes('драка') || lower.includes('украл') || lower.includes('опасн')) {
    return { category: 'Безопасность', department: 'Полиция', priority: 'Высокий', address };
  }

  return { category: 'Другое', department: 'Акимат', priority: 'Низкий', address };
}
