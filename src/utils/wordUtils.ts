// Define types
import type { GuessWithFeedback } from '../types/index';
import { findGroups } from './groupUtils';
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
  const remainingSet = new Set(remainingWords);

  const [uncertainty, totalScore] = calcEntropy(remainingWords, wordScores);

  console.log('remaining uncertainty (bits)', uncertainty);

  const guessScores: [string, number, number, number][] = [];

  const start = performance.now();
  for (const guess of wordList) {
    const groups = findGroups(guess, wordScores, remainingWords);

    const groupProbabilities: number[] = [];

    for (const groupScore of Object.values(groups)) {
      groupProbabilities.push(groupScore / totalScore);
    }

    // expected information fain for this guess (higher is better)
    const infoGain = groupProbabilities.reduce((acc, p) => {
      return acc + p * Math.log2(1 / p);
    }, 0);

    // probability that this guess could be the correct solution (higher is better)
    const pGuess = remainingSet.has(guess)
      ? (wordScores.get(guess) ?? 0) / totalScore
      : 0;

    // score blending both factors (higher is better)
    const score = pGuess + infoGain;

    guessScores.push([guess, score, pGuess, infoGain]);
  }

  const end = performance.now();
  console.log(`main loop: ${end - start}`);

  guessScores.sort((a, b) => b[1] - a[1]);

  console.table(guessScores.slice(0, limit));
}
