import { describe, expect, it } from 'vitest';
import { nicknameFromId } from './nickname';

describe('nicknameFromId', () => {
  it('deterministically returns the identical nickname for the same ID', () => {
    const id = '123e4567-e89b-12d3-a456-426614174000';
    const firstCall = nicknameFromId(id);
    const secondCall = nicknameFromId(id);
    const thirdCall = nicknameFromId(id);

    expect(firstCall).toBe(secondCall);
    expect(secondCall).toBe(thirdCall);
    expect(typeof firstCall).toBe('string');
    expect(firstCall.split(' ').length).toBe(2);
  });

  it('handles empty or whitespace strings gracefully with a default fallback', () => {
    expect(nicknameFromId('')).toBe('Mysterious Stranger');
    expect(nicknameFromId('   ')).toBe('Mysterious Stranger');
  });

  it('generates different nicknames for distinct IDs', () => {
    const idA = 'c028a307-8e65-4f36-96b6-9bb8e5ec2601';
    const idB = '8e52dbb0-dc08-4122-bd54-d89163f92602';
    const idC = 'f979148d-697b-40b9-8eb2-436a5c132603';

    const nickA = nicknameFromId(idA);
    const nickB = nicknameFromId(idB);
    const nickC = nicknameFromId(idC);

    const uniqueNicknames = new Set([nickA, nickB, nickC]);
    expect(uniqueNicknames.size).toBeGreaterThan(1);
  });
});
