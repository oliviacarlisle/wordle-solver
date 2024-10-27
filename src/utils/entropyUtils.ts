// Function to calculate entropy for an array of words
export const calcEntropy = (
  remainingWords: string[],
  wordScores: Map<string, number>,
): [number, number] => {
  const sumScores: number = remainingWords.reduce((sum: number, word: string) => {
    return sum + (wordScores.get(word) ?? 0);
  }, 0);

  const entropy: number = remainingWords.reduce((acc: number, word: string) => {
    const p = (wordScores.get(word) ?? 0) / sumScores;
    return acc + p * Math.log2(1 / p);
  }, 0);

  return [entropy, sumScores];
};
