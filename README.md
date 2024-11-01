# Information Theory-Based Wordle Solver

An efficient Wordle solver that uses information theory to determine optimal guesses. The algorithm strategically minimizes the search space by maximizing information gain with each guess, consistently solving puzzles in 3-4 attempts.

## Key Features

- Uses entropy calculations to optimize word selection
- Pre-computed word frequencies from English corpus
- Achieves average solve rate of 3-4 guesses (TBA)
- Command-line interface for interactive solving (coming soon)
- Includes analysis tools to evaluate solver performance (coming soon)

## Getting Started

To calculate the initial best guess, make sure your `src/index.ts` file looks like this:

```typescript
import type { GuessInfo } from './types/index';
import { WordleSolver } from './WordleSolver';

const feedbackArray: GuessInfo[] = [];

const wordle = new WordleSolver();
const results = wordle.solve(feedbackArray);

console.table(results);
```

Then run:

```bash
npm start
```

Output:

```bash
> wordle-solver@1.0.0 start
> tsx src/index.ts

Possible solutions remaining: 13392
Uncertainty remaining: 12.27 bits
All possible solutions:
 [
  'which', 'their', 'there', 'would', 'about', 'could', 'other',
  'these', 'after', 'first', 'where', 'those', 'being', 'while',
  'right', 'still', 'world', 'never', 'think', 'again', 'three',
  'under', 'might', 'state', 'going', 'place', 'great', 'found',
  'every', 'since', 'water', 'asked', 'power', 'based', 'human',
  'small', 'house', 'women', 'table', 'often', 'using', 'order',
  'point', 'given', 'until', 'large', 'young', 'group', 'study',
  'night', 'heart', 'among', 'press', 'later', 'woman', 'thing',
  'light', 'white', 'early', 'times', 'level', 'hands', 'black',
  'model', 'value', 'along', 'least', 'means', 'shall', 'known',
  'voice', 'child', 'whole', 'above', 'sense', 'taken', 'front',
  'heard', 'began', 'court', 'doing', 'money', 'local', 'close',
  'space', 'party', 'short', 'leave', 'blood', 'quite', 'clear',
  'terms', 'story', 'class', 'field', 'cases', 'today', 'south',
  'stood', 'third',
  ... 13292 more items
]
Computing optimal guesses...
Progress: |████████████████████████████████████████| 100.0% | 14751/14751 | ETA: 0.0s
Main loop: 8272 ms
Total time: 8279 ms
┌─────────┬─────────┬───────────┬───────────┬───────────┐
│ (index) │ 0       │ 1         │ 2         │ 3         │
├─────────┼─────────┼───────────┼───────────┼───────────┤
│ 0       │ 'tares' │ 6.2945888 │ 0.000053  │ 6.2945357 │
│ 1       │ 'lares' │ 6.2138209 │ 0.0000336 │ 6.2137873 │
│ 2       │ 'rates' │ 6.1874746 │ 0         │ 6.1874746 │
│ 3       │ 'tears' │ 6.1726093 │ 0         │ 6.1726093 │
│ 4       │ 'rales' │ 6.169594  │ 0.0000271 │ 6.1695669 │
│ 5       │ 'tales' │ 6.1516003 │ 0         │ 6.1516003 │
│ 6       │ 'ranes' │ 6.149624  │ 7e-7      │ 6.1496233 │
│ 7       │ 'salet' │ 6.1488773 │ 0.0000026 │ 6.1488746 │
│ 8       │ 'teras' │ 6.1466747 │ 0.0000054 │ 6.1466693 │
│ 9       │ 'sater' │ 6.1385576 │ 0.0000338 │ 6.1385237 │
│ 10      │ 'arles' │ 6.1334067 │ 0.0001    │ 6.1333067 │
│ 11      │ 'soare' │ 6.1239104 │ 0.0000073 │ 6.1239031 │
│ 12      │ 'nares' │ 6.1233335 │ 0.0000644 │ 6.1232691 │
│ 13      │ 'tarse' │ 6.1194838 │ 8e-7      │ 6.1194829 │
│ 14      │ 'saner' │ 6.1027169 │ 0.000047  │ 6.1026699 │
└─────────┴─────────┴───────────┴───────────┴───────────┘
```

## Example

Add your guesses -- and the corresponding feedback you received -- to an array and pass it in to the `WordleSolver.prototype.solve()` method as an argument.

Feedback is represented using a `number[]` array, where:

- `0` represents a grey tile (letter not in word)
- `1` represents a green tile (letter in correct position)
- `2` represents a yellow tile (letter in word but not in correct position)

```typescript
export type GuessInfo = { word: string; feedback: number[] };
```

```typescript
import type { GuessInfo } from './types/index';
import { WordleSolver } from './WordleSolver';

const feedbackArray: GuessInfo[] = [
  { word: 'crate', feedback: [2, 0, 0, 2, 0] },
];

const wordle = new WordleSolver();
const results = wordle.solve(feedbackArray);

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
Computing optimal guesses...
Progress: |████████████████████████████████████████| 100.0% | 14751/14751 | ETA: 0.0s
Main loop: 66 ms
Total time: 75 ms
┌─────────┬─────────┬───────────┬───┬───────────┐
│ (index) │ 0       │ 1         │ 2 │ 3         │
├─────────┼─────────┼───────────┼───┼───────────┤
│ 0       │ 'oinks' │ 4.0408944 │ 0 │ 4.0408944 │
│ 1       │ 'pouch' │ 3.9969048 │ 0 │ 3.9969048 │
│ 2       │ 'dinos' │ 3.9826347 │ 0 │ 3.9826347 │
│ 3       │ 'ouphs' │ 3.9671325 │ 0 │ 3.9671325 │
│ 4       │ 'pions' │ 3.9622605 │ 0 │ 3.9622605 │
│ 5       │ 'kinos' │ 3.9533458 │ 0 │ 3.9533458 │
│ 6       │ 'pitso' │ 3.9503433 │ 0 │ 3.9503433 │
│ 7       │ 'pisco' │ 3.9398337 │ 0 │ 3.9398337 │
│ 8       │ 'putos' │ 3.932539  │ 0 │ 3.932539  │
│ 9       │ 'situp' │ 3.9237694 │ 0 │ 3.9237694 │
│ 10      │ 'potin' │ 3.919566  │ 0 │ 3.919566  │
│ 11      │ 'minos' │ 3.9053839 │ 0 │ 3.9053839 │
│ 12      │ 'winos' │ 3.8977037 │ 0 │ 3.8977037 │
│ 13      │ 'hotis' │ 3.8966813 │ 0 │ 3.8966813 │
│ 14      │ 'hoist' │ 3.8952251 │ 0 │ 3.8952251 │
└─────────┴─────────┴───────────┴───┴───────────┘
```
