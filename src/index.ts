import { wordList } from './assets/wordList';
import { getTopGuesses } from './utils/wordUtils';
import { wordScores } from './utils/wordScoreUtils';
import type { GuessWithFeedback } from './types/index';

const LIMIT = 15;

const prevGuesses: GuessWithFeedback[] = [
  { word: 'horse', feedback: new Uint8Array([0, 0, 0, 0, 0]) },
  { word: 'dizzy', feedback: new Uint8Array([2, 0, 0, 0, 1]) },
  { word: 'muddy', feedback: new Uint8Array([0, 0, 0, 1, 1]) },
];

const start = performance.now();
const topGuesses = getTopGuesses(wordList, wordScores, prevGuesses, LIMIT);
console.table(topGuesses);
const end = performance.now();
console.log(`getTopGuesses: ${end - start}`);
