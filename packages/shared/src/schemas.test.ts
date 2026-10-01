import { describe, expect, it } from 'vitest';
import {
  EMOJI_ALLOW_LIST,
  apiEnvSchema,
  realtimeEnvSchema,
  webEnvSchema,
  healthResponseSchema,
  postGuestbookBodySchema,
  getGuestbookQuerySchema,
  getGuestbookResponseSchema,
  postScoreBodySchema,
  clientMessageSchema,
  serverMessageSchema,
} from './index';

describe('Shared Zod Schemas', () => {
  describe('Constants & Allow-lists', () => {
    it('has exactly 24 emoji in the allow-list', () => {
      expect(EMOJI_ALLOW_LIST.length).toBe(24);
      expect(new Set(EMOJI_ALLOW_LIST).size).toBe(24);
    });
  });

  describe('REST Schemas', () => {
    it('validates health response', () => {
      expect(healthResponseSchema.safeParse({ status: 'ok' }).success).toBe(true);
      expect(healthResponseSchema.safeParse({ status: 'error' }).success).toBe(false);
    });

    it('validates post guestbook body with allowed emoji', () => {
      const valid = {
        visitorId: '123e4567-e89b-12d3-a456-426614174000',
        emoji: '👋',
      };
      expect(postGuestbookBodySchema.safeParse(valid).success).toBe(true);

      // Disallowed emoji or free text
      const freeText = {
        visitorId: '123e4567-e89b-12d3-a456-426614174000',
        emoji: 'hello world',
      };
      expect(postGuestbookBodySchema.safeParse(freeText).success).toBe(false);

      // Invalid visitorId UUID
      const invalidUuid = {
        visitorId: 'not-a-uuid',
        emoji: '👋',
      };
      expect(postGuestbookBodySchema.safeParse(invalidUuid).success).toBe(false);
    });

    it('parses guestbook query with defaults', () => {
      const parsed = getGuestbookQuerySchema.parse({});
      expect(parsed.limit).toBe(20);
      expect(parsed.cursor).toBeUndefined();

      const parsedCustom = getGuestbookQuerySchema.parse({
        cursor: '123e4567-e89b-12d3-a456-426614174000',
        limit: '15',
      });
      expect(parsedCustom.limit).toBe(15);
      expect(parsedCustom.cursor).toBe('123e4567-e89b-12d3-a456-426614174000');
    });

    it('validates guestbook response with entries', () => {
      const validResponse = {
        entries: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            nickname: 'Cosmic Wombat',
            emoji: '🚀',
            createdAt: new Date().toISOString(),
          },
        ],
        nextCursor: null,
      };
      expect(getGuestbookResponseSchema.safeParse(validResponse).success).toBe(true);
    });

    it('validates score submission', () => {
      const validScore = {
        visitorId: '123e4567-e89b-12d3-a456-426614174000',
        score: 1500,
      };
      expect(postScoreBodySchema.safeParse(validScore).success).toBe(true);

      const negativeScore = {
        visitorId: '123e4567-e89b-12d3-a456-426614174000',
        score: -10,
      };
      expect(postScoreBodySchema.safeParse(negativeScore).success).toBe(false);
    });
  });

  describe('WebSocket Schemas', () => {
    it('validates client discriminated union messages', () => {
      const helloMsg = {
        type: 'hello',
        visitorId: '123e4567-e89b-12d3-a456-426614174000',
      };
      expect(clientMessageSchema.safeParse(helloMsg).success).toBe(true);

      const handMsg = {
        type: 'hand',
        x: 1.25,
        y: 2.5,
        z: -0.5,
        pinch: true,
      };
      expect(clientMessageSchema.safeParse(handMsg).success).toBe(true);

      const grabMsg = {
        type: 'grab',
        objectId: 'obj-vending-machine',
      };
      expect(clientMessageSchema.safeParse(grabMsg).success).toBe(true);

      const releaseMsg = { type: 'release' };
      expect(clientMessageSchema.safeParse(releaseMsg).success).toBe(true);

      const emojiMsg = { type: 'emoji', emoji: '✨' };
      expect(clientMessageSchema.safeParse(emojiMsg).success).toBe(true);

      // Unknown message type
      const unknownMsg = { type: 'chat', text: 'hi' };
      expect(clientMessageSchema.safeParse(unknownMsg).success).toBe(false);
    });

    it('validates server discriminated union messages', () => {
      const welcomeMsg = {
        type: 'welcome',
        selfId: '123e4567-e89b-12d3-a456-426614174000',
        roomId: 'room-1',
        nickname: 'Zesty Penguin',
      };
      expect(serverMessageSchema.safeParse(welcomeMsg).success).toBe(true);

      const snapshotMsg = {
        type: 'snapshot',
        tick: 42,
        hands: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            nickname: 'Zesty Penguin',
            x: 0,
            y: 1,
            z: 2,
            pinch: false,
          },
        ],
        objects: [
          {
            id: 'obj-plant',
            x: 0,
            y: 0,
            z: 0,
            holderId: null,
          },
        ],
      };
      expect(serverMessageSchema.safeParse(snapshotMsg).success).toBe(true);

      const eventMsg = {
        type: 'event',
        eventType: 'guestbook_entry',
        payload: { emoji: '🎉' },
      };
      expect(serverMessageSchema.safeParse(eventMsg).success).toBe(true);
    });
  });

  describe('Environment Schemas', () => {
    it('parses api env defaults', () => {
      const env = apiEnvSchema.parse({});
      expect(env.PORT).toBe(3001);
      expect(env.HOST).toBe('0.0.0.0');
      expect(env.NODE_ENV).toBe('development');
    });

    it('parses realtime env defaults', () => {
      const env = realtimeEnvSchema.parse({});
      expect(env.PORT).toBe(3002);
      expect(env.HOST).toBe('0.0.0.0');
      expect(env.NODE_ENV).toBe('development');
    });

    it('parses web env defaults', () => {
      const env = webEnvSchema.parse({});
      expect(env.VITE_API_URL).toBe('http://localhost:3001');
      expect(env.VITE_REALTIME_URL).toBe('ws://localhost:3002');
    });
  });
});
