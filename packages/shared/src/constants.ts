export const APP_NAME = 'The Waiting Room';

export const ROOM_CAPACITY = 30;
export const TICK_RATE_HZ = 15;
export const TICK_INTERVAL_MS = Math.round(1000 / TICK_RATE_HZ);

export const MAX_GUESTBOOK_PER_PAGE = 50;
export const DEFAULT_GUESTBOOK_PER_PAGE = 20;

export const EMOJI_ALLOW_LIST = [
  '👋',
  '✌️',
  '🤙',
  '👏',
  '🙌',
  '🤝',
  '💅',
  '☕',
  '🍕',
  '🥑',
  '🚀',
  '🎮',
  '🎨',
  '🌈',
  '✨',
  '🔥',
  '👾',
  '🤖',
  '🐱',
  '🦊',
  '🌻',
  '🎈',
  '🧠',
  '💡',
] as const;

export type AllowedEmoji = (typeof EMOJI_ALLOW_LIST)[number];
