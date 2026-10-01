import { describe, expect, it } from 'vitest';
import { portfolioContent } from './content/portfolio';
import { portfolioContentSchema } from '@waiting-room/shared';

describe('Portfolio Content', () => {
  it('strictly validates against the shared portfolioContentSchema', () => {
    const parsed = portfolioContentSchema.safeParse(portfolioContent);
    expect(parsed.success).toBe(true);
  });

  it('contains expected room mapping keys', () => {
    expect(portfolioContent.roomMapping.projects).toBe('Vending Machine');
    expect(portfolioContent.roomMapping.contact).toBe('Fax Machine');
    expect(portfolioContent.roomMapping.about).toBe('Plant');
    expect(portfolioContent.roomMapping.guestbook).toBe('Guestbook Wall');
  });
});
