import { z } from 'zod';
import { EMOJI_ALLOW_LIST } from '../constants';

// --- Client -> Server Messages ---

export const clientHelloMessageSchema = z.object({
  type: z.literal('hello'),
  visitorId: z.string().uuid(),
  clientVersion: z.string().optional(),
});
export type ClientHelloMessage = z.infer<typeof clientHelloMessageSchema>;

export const clientHandMessageSchema = z.object({
  type: z.literal('hand'),
  x: z.number().finite(),
  y: z.number().finite(),
  z: z.number().finite(),
  pinch: z.boolean(),
});
export type ClientHandMessage = z.infer<typeof clientHandMessageSchema>;

export const clientGrabMessageSchema = z.object({
  type: z.literal('grab'),
  objectId: z.string().min(1).max(64),
});
export type ClientGrabMessage = z.infer<typeof clientGrabMessageSchema>;

export const clientReleaseMessageSchema = z.object({
  type: z.literal('release'),
});
export type ClientReleaseMessage = z.infer<typeof clientReleaseMessageSchema>;

export const clientEmojiMessageSchema = z.object({
  type: z.literal('emoji'),
  emoji: z.enum(EMOJI_ALLOW_LIST),
});
export type ClientEmojiMessage = z.infer<typeof clientEmojiMessageSchema>;

export const clientMessageSchema = z.discriminatedUnion('type', [
  clientHelloMessageSchema,
  clientHandMessageSchema,
  clientGrabMessageSchema,
  clientReleaseMessageSchema,
  clientEmojiMessageSchema,
]);
export type ClientMessage = z.infer<typeof clientMessageSchema>;

// --- Server -> Client Messages ---

export const serverWelcomeMessageSchema = z.object({
  type: z.literal('welcome'),
  selfId: z.string().uuid(),
  roomId: z.string().min(1).max(64),
  nickname: z.string().min(1).max(100),
});
export type ServerWelcomeMessage = z.infer<typeof serverWelcomeMessageSchema>;

export const snapshotHandSchema = z.object({
  id: z.string().uuid(),
  nickname: z.string().min(1).max(100),
  x: z.number().finite(),
  y: z.number().finite(),
  z: z.number().finite(),
  pinch: z.boolean(),
});
export type SnapshotHand = z.infer<typeof snapshotHandSchema>;

export const snapshotObjectSchema = z.object({
  id: z.string().min(1).max(64),
  x: z.number().finite(),
  y: z.number().finite(),
  z: z.number().finite(),
  holderId: z.string().uuid().nullable(),
});
export type SnapshotObject = z.infer<typeof snapshotObjectSchema>;

export const serverSnapshotMessageSchema = z.object({
  type: z.literal('snapshot'),
  tick: z.number().int().nonnegative(),
  hands: z.array(snapshotHandSchema),
  objects: z.array(snapshotObjectSchema),
});
export type ServerSnapshotMessage = z.infer<typeof serverSnapshotMessageSchema>;

export const serverEventMessageSchema = z.object({
  type: z.literal('event'),
  eventType: z.string().min(1).max(64),
  payload: z.record(z.string(), z.unknown()),
});
export type ServerEventMessage = z.infer<typeof serverEventMessageSchema>;

export const serverMessageSchema = z.discriminatedUnion('type', [
  serverWelcomeMessageSchema,
  serverSnapshotMessageSchema,
  serverEventMessageSchema,
]);
export type ServerMessage = z.infer<typeof serverMessageSchema>;
