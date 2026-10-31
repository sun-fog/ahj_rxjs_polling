# Polling

# Домашнее задание к занятию "11. RxJS"

![Build & Deploy](https://github.com/sun-fog/ahj_rxjs_polling/actions/workflows/deploy.yml/badge.svg)

[Демо на GitHub Pages](https://sun-fog.github.io/ahj_rxjs_polling/)

## Как работает

- Серверная часть: Netlify Function, эндпоинт `/messages/unread` возвращает случайные непрочитанные сообщения (faker). Бэкенд развёрнут на Netlify: <https://creative-travesseiro-f91493.netlify.app/messages/unread>
- Клиентская часть: виджет каждые 5 секунд опрашивает сервер через `interval` + `ajax.getJSON`, новые сообщения добавляются сверху таблицы. `subject` обрезается до 15 символов, дата форматируется в `ЧЧ:ММ ДД.ММ.ГГГГ`. Любая ошибка запроса трактуется как «новых сообщений нет».

## Деплой

- **Фронтенд** — GitHub Pages: деплой через GitHub Actions (`.github/workflows/deploy.yml`) при пуше в `main`.
- **Бэкенд** — Netlify Functions: папка `netlify/functions`, путь `/messages/unread` пробрасывается на функцию через `netlify.toml`. Netlify пересобирает функцию автоматически при пуше в `main`.

## Локальный запуск

```bash
npm ci
npm start        # API на http://localhost:3000
npm run dev      # фронтенд на http://localhost:8080
