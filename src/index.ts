import type { GuessInfo } from './types/index';
import { WordleSolver } from './WordleSolver';

const feedbackArray: GuessInfo[] = [];

const wordle = new WordleSolver();
const results = wordle.solve(feedbackArray);

console.table(results);
