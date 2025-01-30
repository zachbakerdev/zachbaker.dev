import * as migration_20250128_130430 from './20250128_130430';
import * as migration_20250128_131006 from './20250128_131006';
import * as migration_20250128_164100 from './20250128_164100';
import * as migration_20250130_215419 from './20250130_215419';

export const migrations = [
  {
    up: migration_20250128_130430.up,
    down: migration_20250128_130430.down,
    name: '20250128_130430',
  },
  {
    up: migration_20250128_131006.up,
    down: migration_20250128_131006.down,
    name: '20250128_131006',
  },
  {
    up: migration_20250128_164100.up,
    down: migration_20250128_164100.down,
    name: '20250128_164100',
  },
  {
    up: migration_20250130_215419.up,
    down: migration_20250130_215419.down,
    name: '20250130_215419'
  },
];
