import { hashFeedback, generateFeedback } from './feedbackUtils';

export const findGroups = (
  guess: string,
  wordScores: Map<string, number>,
  possibilities: string[],
  groups: Float32Array,
): void => {
  for (let i = 0; i < possibilities.length; i++) {
    const solution = possibilities[i];
    const patternIdx = hashFeedback(generateFeedback(guess, solution));

    if (!groups[patternIdx]) groups[patternIdx] = 0;
    groups[patternIdx] += wordScores.get(solution) ?? 0;
  }
};
