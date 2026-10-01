import { describe, expect, it } from 'vitest';
import { APP_NAME } from './index';

describe('shared constants', () => {
  it('exports the app name', () => {
    expect(APP_NAME).toBe('The Waiting Room');
  });
});
