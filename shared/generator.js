import { faker } from '@faker-js/faker';

const SUBJECTS = [
  'Hello from', 'Meeting tomorrow at', 'Lunch today?',
  'Invoice attached', 'Urgent: deadline', 'Weekend plans',
  'Code review ready', 'Conference call rescheduled',
];

function randomSubject() {
  return `${faker.helpers.arrayElement(SUBJECTS)} ${faker.person.firstName()}`;
}

export function generateMessages() {
  const count = faker.number.int({ min: 1, max: 5 });
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    from: `${faker.person.firstName().toLowerCase()}@${faker.person.lastName().toLowerCase()}`,
    subject: randomSubject(),
    body: faker.lorem.paragraphs(2),
    received: Math.floor(Date.now() / 1000),
  }));
}

export function unreadResponse() {
  return {
    status: 'ok',
    timestamp: Math.floor(Date.now() / 1000),
    messages: generateMessages(),
  };
}
