import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const guestbookEntries = pgTable('guestbook_entries', {
  id: uuid('id').primaryKey().defaultRandom(),
  nickname: text('nickname').notNull(),
  emoji: text('emoji').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
