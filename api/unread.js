import { unreadResponse } from '../shared/generator.js';

export default function handler(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).json(unreadResponse());
}
