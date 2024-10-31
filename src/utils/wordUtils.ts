// Define types
import type { GuessWithFeedback } from '../types/index';
import { generateFeedback, hashFeedback } from './feedbackUtils';
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

  console.log('Possible solutions remaining:', remainingWords.length);

  const remainingSet = new Set(remainingWords);

  const [uncertainty, totalScore] = calcEntropy(remainingWords, wordScores);

  console.log(
    'Uncertainty remaining:',
    Math.trunc(uncertainty * 100) / 100,
    'bits',
  );

  console.log('All possible solutions:\n', remainingWords);

  const guessScores: [string, number, number, number][] = [];

  const start = performance.now();

  console.log('Computing optimal guesses...');
  const bar = new ProgressBar(wordList.length);

  // initialize and allocate groups scores array
  const groups = new Float32Array(243);

  for (let i = 0; i < wordList.length; i++) {
    // Update progress bar
    if (i % 64 === 0) bar.update(i);

    const guess = wordList[i];

    // reset groups to 0 - reuse array to reduce memory allocation
    for (let i = 0; i < groups.length; i++) {
      groups[i] = 0;
    }

    for (let i = 0; i < remainingWords.length; i++) {
      const solution = remainingWords[i];
      const patternIdx = hashFeedback(generateFeedback(guess, solution));

      if (!groups[patternIdx]) groups[patternIdx] = 0;
      groups[patternIdx] += wordScores.get(solution) ?? 0;
    }

    // calculate expected information gain for this guess (higher is better)
    let infoGain = 0;
    for (let i = 0; i < groups.length; i++) {
      if (groups[i] > 0) {
        const p = groups[i] / totalScore;
        infoGain += p * Math.log2(1 / p); // entropy calculation
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
  console.log('Main loop:', Math.trunc(end - start), 'ms');

  guessScores.sort((a, b) => b[1] - a[1]);

  const formatNum = (num: number, digits = 7) =>
    Math.trunc(num * 10 ** digits) / 10 ** digits;

  return guessScores
    .slice(0, limit)
    .map((row) => [
      row[0],
      formatNum(row[1]),
      formatNum(row[2]),
      formatNum(row[3]),
    ]);
}
