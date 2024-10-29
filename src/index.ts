import { WordleSolver } from './WordleSolver';

const wordle = new WordleSolver();

const results = wordle.solve([
  { word: 'tares', feedback: [1, 0, 0, 0, 0] },
  // { word: 'yogin', feedback: [0, 0, 0, 1, 2] },
  // { word: 'cents', feedback: [2, 0, 1, 2, 0] },
]);

console.table(results);
