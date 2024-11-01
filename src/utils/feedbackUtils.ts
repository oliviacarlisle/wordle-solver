import { getChar } from './conversions';

export function hashFeedback(feedback: Uint8Array): number {
  return (
    feedback[0] * 81 +
    feedback[1] * 27 +
    feedback[2] * 9 +
    feedback[3] * 3 +
    feedback[4]
  );
}

const feedback = new Uint8Array(5);
const counts = new Uint8Array(26); // Pre-allocated array for letter counts

// Function to generate feedback for a guess against a solution
export function generateFeedbackNums(
  guess: number,
  solution: number,
): Uint8Array {
  feedback.fill(0);
  counts.fill(0);

  // First pass: mark correct positions and count remaining letters
  for (let i = 0; i < 5; i++) {
    if (getChar(guess, i) === getChar(solution, i)) {
      feedback[i] = 1;
    } else {
      counts[getChar(solution, i)]++;
    }
  }

  // Second pass: mark correct letters in wrong positions
  for (let i = 0; i < 5; i++) {
    if (feedback[i] === 0) {
      const idx = getChar(guess, i);
      if (counts[idx] > 0) {
        feedback[i] = 2;
        counts[idx]--;
      }
    }
  }

  return feedback;
}

// Function to generate feedback for a guess against a solution
export function generateFeedback(guess: string, solution: string): Uint8Array {
  const feedback = new Uint8Array(5);
  const counts = new Uint8Array(26); // Pre-allocated array for letter counts

  // First pass: mark correct positions and count remaining letters
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      feedback[i] = 1;
    } else {
      counts[solution.charCodeAt(i) - 97]++;
    }
  }

  // Second pass: mark correct letters in wrong positions
  for (let i = 0; i < 5; i++) {
    if (feedback[i] === 0) {
      const idx = guess.charCodeAt(i) - 97;
      if (counts[idx] > 0) {
        feedback[i] = 2;
        counts[idx]--;
      }
    }
  }

  return feedback;
}
