import { WordleSolver } from './WordleSolver';

const wordle = new WordleSolver();

const results = wordle.solve([]);

console.table(results);
