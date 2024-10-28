import { hashFeedback, generateFeedback } from './feedbackUtils';

export const findGroups = (
  guess: string,
  wordScores: Map<string, number>,
  possibilities: string[],
): Record<number, number> => {
  const groups: Record<number, number> = {};

  for (const solution of possibilities) {
    const pattern = hashFeedback(generateFeedback(guess, solution));

    if (!groups[pattern]) groups[pattern] = 0;
    groups[pattern] += wordScores.get(solution)!;
  }

  return groups;
};
