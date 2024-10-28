import type { GuessWithFeedback } from '../types/index';
import { hashFeedback, generateFeedback } from './feedbackUtils';

export function filterWords(
  words: string[],
  guesses: GuessWithFeedback[],
): string[] {
  for (const guess of guesses) {
    words = words.filter((word) => isPossibility(word, guess));
  }

  return words;
}

// Function to filter words based on feedback
function isPossibility(
  word: string,
  guessWithFeedback: GuessWithFeedback,
): boolean {
  const { word: guessWord, feedback } = guessWithFeedback;

  const actualFeedback = hashFeedback(generateFeedback(guessWord, word));
  const expectedFeedback = hashFeedback(feedback);

  // compare feedback with actualFeedback
  return expectedFeedback === actualFeedback;
}
