import { interval, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import './index.css';

const DEPLOYED_API = 'https://ВАШ-ПРОЕКТ.vercel.app/messages/unread';

const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const apiUrl = isLocal ? '/messages/unread' : DEPLOYED_API;
const POLL_INTERVAL_MS = 5000;

// сокращаем subject до 15 символов, если длиннее
const truncate = (text, limit = 15) =>
  text.length > limit ? `${text.slice(0, limit)}…` : text;

// timestamp (секунды) -> ЧЧ:ММ ДД.ММ.ГГГГ
const formatDate = (ts) => {
  const d = new Date(ts * 1000);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())} ` +
    `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
};

const renderMessage = ({ id, from, subject, received }) => `
  <tr data-id="${id}">
    <td class="from">${from}</td>
    <td class="subject">${truncate(subject)}</td>
    <td class="received">${formatDate(received)}</td>
  </tr>`;

const tbody = document.querySelector('#messages tbody');

const messages$ = interval(POLL_INTERVAL_MS).pipe(
  startWith(0), // первый запрос сразу, не через 5 секунд
  switchMap(() =>
    ajax.getJSON(`${apiUrl}?t=${Date.now()}`).pipe(
      map((response) => response.messages ?? []),
      // любая ошибка (сеть, код не 200) = «нет новых сообщений»
      catchError(() => of([])),
    ),
  ),
);

messages$.subscribe((messages) => {
  const rows = messages.map(renderMessage).join('');
  // новые сообщения добавляются строго сверху, старые не удаляются
  tbody.insertAdjacentHTML('afterbegin', rows);
});
