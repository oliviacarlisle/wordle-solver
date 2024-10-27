import type { GuessWithFeedback } from '../types/index';

export function filterWords(words: string[], guesses: GuessWithFeedback[]): string[] {
  for (const guess of guesses) {
    words = filterHelper(words, guess);
  }

  return words;
}

// Function to filter words based on feedback
function filterHelper(words: string[], guessWithFeedback: GuessWithFeedback): string[] {
  return words.filter((word) => {
    for (let i = 0; i < 5; i++) {
      if (guessWithFeedback.feedback[i] === 'g' && word[i] !== guessWithFeedback.word[i]) {
        return false;
      }
      if (
        guessWithFeedback.feedback[i] === 'y' &&
        (!word.includes(guessWithFeedback.word[i]) || word[i] === guessWithFeedback.word[i])
      ) {
        return false;
      }
      if (guessWithFeedback.feedback[i] === 'x' && word.includes(guessWithFeedback.word[i])) {
        return false;
      }
    }
    return true;
  });
}
