import type { Feedback } from '../types/index';

// Function to generate feedback for a guess against a solution
export function generateFeedback(guess: string, solution: string): Feedback {
  const feedback: Feedback = ['x', 'x', 'x', 'x', 'x'];
  const letterCounts: Record<string, number> = {};

  // First pass: mark correct positions and count remaining letters
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      feedback[i] = 'g';
    } else {
      letterCounts[solution[i]] = (letterCounts[solution[i]] || 0) + 1;
    }
  }

  // Second pass: mark correct letters in wrong positions
  for (let i = 0; i < 5; i++) {
    if (feedback[i] === 'x' && letterCounts[guess[i]]) {
      feedback[i] = 'y';
      letterCounts[guess[i]]--;
    }
  }

  return feedback;
}
