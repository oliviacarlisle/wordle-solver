# Information Theory-Based Wordle Solver

An efficient Wordle solver that uses information theory to determine optimal guesses. The algorithm strategically minimizes the search space by maximizing information gain with each guess, consistently solving puzzles in 3-4 attempts.

# Getting Started

To calculate the initial best guess:

```typescript
import { WordleSolver } from './WordleSolver';

const wordle = new WordleSolver();

const results = wordle.solve([]);

console.table(results);
```

Output:

```bash
> wordle-solver@1.0.0 dev:bun
> bun run src/index.ts

Possible solutions remaining: 13449
Uncertainty remaining: 12.28 bits
All possible solutions:
 [
  "which", "their", "there", "would", "about", "could", "other", "these", "after", "first", "where", "those",
  "being", "while", "right", "still", "world", "never", "think", "again", "three", "under", "might", "state",
  "going", "place", "great", "found", "every", "since", "water", "asked", "power", "based", "human", "small",
  "house", "women", "table", "often", "using", "order", "point", "given", "until", "large", "young", "group",
  "study", "night", "heart", "among", "press", "later", "woman", "thing", "light", "white", "early", "times",
  "level", "hands", "black", "model", "value", "along", "least", "means", "shall", "known", "voice", "child",
  "whole", "above", "death", "sense", "taken", "front", "heard", "began", "court", "doing", "money", "local",
  "close", "space", "party", "short", "leave", "blood", "quite", "clear", "terms", "story", "class", "field",
  "cases", "today", "south", "stood",
  ... 13349 more items
]
Progress: |████████████████████████████████████████| 100.0% | 14808/14808 | ETA: 0.0s
Main loop: 9206 ms
Total time: 9211 ms
┌────┬───────┬───────────┬───────────┬───────────┐
│    │ 0     │ 1         │ 2         │ 3         │
├────┼───────┼───────────┼───────────┼───────────┤
│  0 │ tares │ 6.2918578 │ 0.0000525 │ 6.2918053 │
│  1 │ lares │ 6.2116286 │ 0.0000333 │ 6.2115953 │
│  2 │ rates │ 6.1856232 │ 0         │ 6.1856232 │
│  3 │ tears │ 6.1711465 │ 0         │ 6.1711465 │
│  4 │ rales │ 6.1687789 │ 0.0000268 │ 6.168752  │
│  5 │ ranes │ 6.1471763 │ 6e-7      │ 6.1471756 │
│  6 │ tales │ 6.1471463 │ 0         │ 6.1471463 │
│  7 │ salet │ 6.1455526 │ 0.0000026 │ 6.14555   │
│  8 │ teras │ 6.1444465 │ 0.0000053 │ 6.1444411 │
│  9 │ sater │ 6.1365157 │ 0.0000335 │ 6.1364822 │
│ 10 │ arles │ 6.1341683 │ 0.000099  │ 6.1340692 │
│ 11 │ soare │ 6.1264771 │ 0.0000072 │ 6.1264698 │
│ 12 │ nares │ 6.1203493 │ 0.0000637 │ 6.1202855 │
│ 13 │ tarse │ 6.1199568 │ 8e-7      │ 6.1199559 │
│ 14 │ saner │ 6.0994277 │ 0.0000465 │ 6.0993811 │
└────┴───────┴───────────┴───────────┴───────────┘
```

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
