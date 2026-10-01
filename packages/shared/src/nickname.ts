const ADJECTIVES = [
  'Bumbling',
  'Caffeinated',
  'Chaotic',
  'Cosmic',
  'Dizzy',
  'Electric',
  'Fluffy',
  'Funky',
  'Galactic',
  'Giddy',
  'Glorious',
  'Groovy',
  'Hyperactive',
  'Jazzy',
  'Jumpy',
  'Mighty',
  'Mysterious',
  'Nifty',
  'Peppy',
  'Polite',
  'Puzzled',
  'Quantum',
  'Radical',
  'Rowdy',
  'Saucy',
  'Sleepy',
  'Sneaky',
  'Sparkly',
  'Spicy',
  'Squishy',
  'Turbo',
  'Velvet',
  'Wobbly',
  'Zesty',
] as const;

const NOUNS = [
  'Badger',
  'Cactus',
  'Croissant',
  'Dumpling',
  'Falcon',
  'Ferret',
  'Flamingo',
  'Gecko',
  'Hamster',
  'Hedgehog',
  'Koala',
  'Llama',
  'Marmot',
  'Meatball',
  'Muffin',
  'Noodle',
  'Octopus',
  'Otter',
  'Pancake',
  'Penguin',
  'Pickle',
  'Platypus',
  'Potato',
  'Pug',
  'Raccoon',
  'Toaster',
  'Turtle',
  'Waffle',
  'Walrus',
  'Wombat',
  'Yeti',
] as const;

/**
 * 32-bit FNV-1a hash function.
 * Deterministic and fast with good distribution.
 */
function fnv1a(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/**
 * Deterministically derives a funny human-readable nickname from a visitor ID.
 * The API and Realtime services can use this independently without database or network lookups.
 */
export function nicknameFromId(visitorId: string): string {
  if (!visitorId || visitorId.trim() === '') {
    return 'Mysterious Stranger';
  }

  const hash1 = fnv1a(visitorId);
  const hash2 = fnv1a(visitorId + '_salt');

  const adjective = ADJECTIVES[hash1 % ADJECTIVES.length];
  const noun = NOUNS[hash2 % NOUNS.length];

  return `${adjective} ${noun}`;
}
