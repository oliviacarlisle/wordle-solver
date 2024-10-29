// Define types
import type { GuessWithFeedback } from '../types/index';
import { findGroups } from './groupUtils';
import { filterWords } from './filterUtils';
import { calcEntropy } from './entropyUtils';
import { ProgressBar } from './ProgressBar';

// Function to get the top 10 optimal guesses
export function getTopGuesses(
  wordList: string[],
  wordScores: Map<string, number>,
  previousGuesses: GuessWithFeedback[],
  limit: number,
): [string, number, number, number][] {
  // Filter words based on previous guesses

  const remainingWords = filterWords([...wordScores.keys()], previousGuesses);

  console.log('Possibilities remaining', remainingWords.length);
  console.log(remainingWords);
  const remainingSet = new Set(remainingWords);

  const [uncertainty, totalScore] = calcEntropy(remainingWords, wordScores);

  console.log('remaining uncertainty (bits)', uncertainty);

  const guessScores: [string, number, number, number][] = [];

  const start = performance.now();

  const groups = new Float32Array(243);

  const bar = new ProgressBar(wordList.length);

  for (let i = 0; i < wordList.length; i++) {
    if (i % 64 === 0) bar.update(i);
    const guess = wordList[i];
    // reset groups to 0
    for (let i = 0; i < groups.length; i++) {
      groups[i] = 0;
    }

    findGroups(guess, wordScores, remainingWords, groups);

    // calculate expected information gain for this guess (higher is better)
    let infoGain = 0;
    for (let i = 0; i < groups.length; i++) {
      if (groups[i] > 0) {
        const p = groups[i] / totalScore;
        infoGain += p * Math.log2(1 / p);
      }
    }

    // probability that this guess could be the correct solution (higher is better)
    const pGuess = remainingSet.has(guess)
      ? (wordScores.get(guess) ?? 0) / totalScore
      : 0;

    // score blending both factors (higher is better)
    const score = pGuess + infoGain;

    guessScores.push([guess, score, pGuess, infoGain]);
  }
  bar.update(wordList.length);

  const end = performance.now();
  console.log(`main loop: ${end - start}`);

  guessScores.sort((a, b) => b[1] - a[1]);

  return guessScores.slice(0, limit);
}
