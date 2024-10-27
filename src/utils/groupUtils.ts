import { generateFeedback } from './feedbackUtils';

export const groupByPattern = (guess: string, possibilities: string[]): Map<string, string[]> => {
  const groups = new Map<string, string[]>();

  for (const solution of possibilities) {
    const pattern = generateFeedback(guess, solution).join();

    if (!groups.has(pattern)) groups.set(pattern, []);
    groups.get(pattern)!.push(solution);
  }

  return groups;
};
