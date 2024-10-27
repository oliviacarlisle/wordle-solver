import { wordList } from './assets/wordList';
import { getTopGuesses } from './utils/wordUtils';
import { wordScores } from './utils/wordScoreUtils';
import type { GuessWithFeedback } from './types/index';

const LIMIT = 20;

const prevGuesses: GuessWithFeedback[] = [{ word: 'rates', feedback: ['x', 'g', 'x', 'x', 'y'] }];

getTopGuesses(wordList, wordScores, prevGuesses, LIMIT);
