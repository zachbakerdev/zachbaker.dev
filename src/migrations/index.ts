import * as migration_20250128_130430 from './20250128_130430';
import * as migration_20250128_131006 from './20250128_131006';

export const migrations = [
  {
    up: migration_20250128_130430.up,
    down: migration_20250128_130430.down,
    name: '20250128_130430',
  },
  {
    up: migration_20250128_131006.up,
    down: migration_20250128_131006.down,
    name: '20250128_131006'
  },
];
