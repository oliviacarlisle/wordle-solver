import { WordleSolver } from './WordleSolver';

const wordle = new WordleSolver();

const results = wordle.solve([{ word: 'crate', feedback: [2, 0, 0, 2, 0] }]);

console.table(results);
