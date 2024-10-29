# Information Theory-Based Wordle Solver

An efficient Wordle solver that uses information theory to determine optimal guesses. The algorithm strategically minimizes the search space by maximizing information gain with each guess, consistently solving puzzles in 3-4 attempts.

# Example

```typescript
import { WordleSolver } from './WordleSolver';

const wordle = new WordleSolver();

const results = wordle.solve([{ word: 'crate', feedback: [2, 0, 0, 2, 0] }]);

console.table(results);
```

Output:

```bash
> wordle-solver@1.0.0 start
> tsx src/index.ts

Possible solutions remaining: 65
Uncertainty remaining: 5.06 bits
All possible solutions:
 [
  'touch', 'stock', 'thick', 'topic', 'stick',
  'stuck', 'dutch', 'pitch', 'toxic', 'witch',
  'optic', 'ditch', 'scout', 'mitch', 'notch',
  'tonic', 'stoic', 'tunic', 'hitch', 'nicht',
  'ticks', 'butch', 'itchy', 'fitch', 'hutch',
  'scoot', 'lytic', 'tucks', 'uncut', 'ontic',
  'licht', 'licit', 'picot', 'stich', 'botch',
  'kutch', 'sicht', 'octyl', 'dicot', 'mutch',
  'typic', 'potch', 'ictus', 'titch', 'tichy',
  'micht', 'gotch', 'tinct', 'lotic', 'sitch',
  'hotch', 'kotch', 'mulct', 'ticky', 'tocks',
  'dicht', 'mutic', 'octic', 'incut', 'oucht',
  'octli', 'tocky', 'gitch', 'docht', 'tocos'
]
Progress: |████████████████████████████████████████| 100.0% | 14808/14808 | ETA: 0.0s
Main loop: 105 ms
Total time: 112 ms
┌─────────┬─────────┬───────────┬───┬───────────┐
│ (index) │ 0       │ 1         │ 2 │ 3         │
├─────────┼─────────┼───────────┼───┼───────────┤
│ 0       │ 'oinks' │ 4.0408945 │ 0 │ 4.0408945 │
│ 1       │ 'pouch' │ 3.9969048 │ 0 │ 3.9969048 │
│ 2       │ 'dinos' │ 3.9826347 │ 0 │ 3.9826347 │
│ 3       │ 'ouphs' │ 3.9671325 │ 0 │ 3.9671325 │
│ 4       │ 'pions' │ 3.9622605 │ 0 │ 3.9622605 │
│ 5       │ 'kinos' │ 3.9533458 │ 0 │ 3.9533458 │
│ 6       │ 'pitso' │ 3.9503433 │ 0 │ 3.9503433 │
│ 7       │ 'pisco' │ 3.9398338 │ 0 │ 3.9398338 │
│ 8       │ 'putos' │ 3.9325391 │ 0 │ 3.9325391 │
│ 9       │ 'situp' │ 3.9237694 │ 0 │ 3.9237694 │
│ 10      │ 'potin' │ 3.919566  │ 0 │ 3.919566  │
│ 11      │ 'minos' │ 3.9053839 │ 0 │ 3.9053839 │
│ 12      │ 'winos' │ 3.8977037 │ 0 │ 3.8977037 │
│ 13      │ 'hotis' │ 3.8966813 │ 0 │ 3.8966813 │
│ 14      │ 'hoist' │ 3.8952251 │ 0 │ 3.8952251 │
└─────────┴─────────┴───────────┴───┴───────────┘
```

## Key Features

- Uses entropy calculations to optimize word selection
- Pre-computed word frequencies from English corpus
- Achieves average solve rate of 3-4 guesses (TBA)
- Command-line interface for interactive solving (coming soon)
- Includes analysis tools to evaluate solver performance (coming soon)
