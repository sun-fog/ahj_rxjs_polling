import { unreadResponse } from '../../shared/generator.js';

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
};

export async function handler(event) {
  // браузер сначала шлёт OPTIONS (preflight) — отвечаем на него
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: '',
    };
  }

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify(unreadResponse()),
  };
}
