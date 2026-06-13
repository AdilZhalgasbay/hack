# ГородОК — AI-портал городских жалоб
**SmartScape Hackathon 2025 | Track 3: City Safety & Social Services**

![ГородОК Banner](https://img.shields.io/badge/Track_3-City_Safety_%26_Social_Services-22C55E?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase)
![Gemini AI](https://img.shields.io/badge/Gemini_1.5_Flash-AI_Classification-blue?style=for-the-badge&logo=google)

## 📌 О проекте (Relevance & significance)
ГородОК — это умная система маршрутизации гражданских обращений. Жителям больше не нужно думать, в какую инстанцию писать (в КСК, акимат, водоканал или полицию). Пользователь просто описывает проблему и ставит точку на карте. Наш AI-алгоритм автоматически:
1. Выявляет суть проблемы.
2. Определяет уровень приоритета (Низкий, Средний, Высокий).
3. Назначает ответственный департамент.
4. Извлекает точный адрес из координат (Reverse Geocoding).

Это решает проблему бюрократии, ускоряет реакцию экстренных и коммунальных служб, делая город безопаснее и доступнее для каждого.

## 🚀 Инновация (Innovation & originality)
- **Zero-click маршрутизация**: Интеграция с Google Gemini AI позволяет перевести неструктурированный текст (жалобу человека на эмоциях) в четкий JSON-формат для городских баз данных.
- **Offline Fallback**: Если AI-сервис недоступен, система использует встроенный алгоритм ключевых слов для бесперебойной работы.
- **Интерактивный дашборд**: Все проблемы визуализируются на карте в реальном времени с цветовой кодировкой приоритетов.

## 💻 Техническая реализация (Technical implementation)
- **Frontend**: Next.js (App Router), React, Tailwind CSS (Custom OLED Design System).
- **Карты и Геокодирование**: Leaflet, React-Leaflet, Nominatim API (OpenStreetMap).
- **Backend**: Next.js API Routes + Supabase (PostgreSQL) с настроенным RLS.
- **AI Модель**: `@google/generative-ai` (Gemini 1.5 Flash).

### Как запустить локально
1. Клонируйте репозиторий.
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Создайте файл `.env.local` и добавьте ключи (шаблон в проекте):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=ваша_ссылка
   NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_ключ
   ```
4. Выполните SQL-скрипт из `supabase/schema.sql` в вашем проекте Supabase.
5. Запустите сервер:
   ```bash
   npm run dev
   ```
6. Откройте `http://localhost:3000`.

## 🌍 Практическая применимость (Practical applicability)
Проект готов к интеграции в систему "Сергек" или `e-Otinish`. Архитектура позволяет легко заменить Supabase на любую государственную СУБД, а AI-модель — на локальную LLM (например, Llama 3) для соблюдения законов о персональных данных.

## 📊 Данные (Data quality & methodology)
Для демонстрации используется пользовательский ввод в реальном времени. В качестве картографической основы применяется `OpenStreetMap`, предоставляющий детализированные гео-данные инфраструктуры городов (включая Актобе).
