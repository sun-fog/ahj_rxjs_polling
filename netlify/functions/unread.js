import { unreadResponse } from '../../shared/generator.js';

export async function handler(event) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(unreadResponse()),
  };
}
