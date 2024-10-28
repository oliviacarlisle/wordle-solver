import { wordList } from './assets/wordList';
import { getTopGuesses } from './utils/wordUtils';
import { wordScores } from './utils/wordScoreUtils';
import type { GuessWithFeedback } from './types/index';

const LIMIT = 15;

const prevGuesses: GuessWithFeedback[] = [
  { word: 'tares', feedback: [0, 1, 0, 0, 0] },
];

const start = performance.now();
getTopGuesses(wordList, wordScores, prevGuesses, LIMIT);
const end = performance.now();
console.log(`getTopGuesses: ${end - start}`);
