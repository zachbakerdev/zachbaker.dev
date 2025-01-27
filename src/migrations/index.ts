import * as migration_20250127_204009 from './20250127_204009';

export const migrations = [
  {
    up: migration_20250127_204009.up,
    down: migration_20250127_204009.down,
    name: '20250127_204009'
  },
];
