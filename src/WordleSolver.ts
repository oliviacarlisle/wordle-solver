import { wordList } from './assets/wordList';
import { getTopGuesses } from './utils/wordUtils';
import { wordScores } from './utils/wordScoreUtils';
import type { GuessInfo, GuessWithFeedback } from './types/index';
import { parseGuesses } from './utils/parseUtils';

export class WordleSolver {
  limit: number;

  constructor(limit = 15) {
    this.limit = limit;
  }

  solve(guesses: GuessInfo[]): [string, number, number, number][] {
    try {
      const guessList: GuessWithFeedback[] = parseGuesses(guesses);

      const start = performance.now();
      const results = getTopGuesses(
        wordList,
        wordScores,
        guessList,
        this.limit,
      );
      const end = performance.now();
      console.log('Total time:', Math.trunc(end - start), 'ms');

      return results;
    } catch (e) {
      console.error('Error parsing guess info', e);
      throw new Error('Error parsing guess info');
    }
  }
}
