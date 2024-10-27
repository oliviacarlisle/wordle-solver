// Define types
import type { GuessWithFeedback } from '../types/index';
import { groupByPattern } from './groupUtils';
import { filterWords } from './filterUtils';
import { calcEntropy } from './entropyUtils';

// Function to get the top 10 optimal guesses
export function getTopGuesses(
  wordList: string[],
  wordScores: Map<string, number>,
  previousGuesses: GuessWithFeedback[],
  limit: number,
): void {
  // Filter words based on previous guesses
  const remainingWords = filterWords([...wordScores.keys()], previousGuesses);

  console.log('Possibilities remaining', remainingWords.length);
  console.log(remainingWords);

  const [uncertainty, totalScore] = calcEntropy(remainingWords, wordScores);

  console.log('remaining uncertainty (bits)', uncertainty);

  const guessScores: [string, number, number, number][] = [];

  for (const guess of wordList) {
    const groups = groupByPattern(guess, remainingWords);

    const groupProbabilities: number[] = [];

    groups.forEach((words) => {
      const groupScore = words.reduce((sum, word) => sum + wordScores.get(word)!, 0);

      groupProbabilities.push(groupScore / totalScore);
    });

    const infoGain = groupProbabilities.reduce((acc, p) => {
      return acc + p * Math.log2(1 / p);
    }, 0);

    // probability that this guess could be the correct solution
    const possible = remainingWords.includes(guess) ? 1 : 0;
    const pGuess = (possible * (wordScores.get(guess) ?? 0)) / totalScore;

    // expected value of steps remaining to complete game
    const score = pGuess + infoGain;

    guessScores.push([guess, score, pGuess, infoGain]);
  }

  guessScores.sort((a, b) => b[1] - a[1]);

  console.log(guessScores.slice(0, limit));
}
