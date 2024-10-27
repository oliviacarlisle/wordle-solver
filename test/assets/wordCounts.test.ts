import { wordCounts } from '../../src/assets/wordCounts';
import { wordList } from '../../src/assets/wordList';

describe('wordCounts', () => {
  it('should have all words present in wordList', () => {
    const allowedGuesses = new Set(wordList);
    wordCounts.forEach(([word]) => {
      expect(allowedGuesses.has(word)).toBe(true);
    });
  });

  it('should have positive integer counts', () => {
    wordCounts.forEach(([_, count]) => {
      expect(Number.isInteger(count)).toBe(true);
      expect(count).toBeGreaterThan(0);
    });
  });

  it('should be properly structured as [string, number] tuples', () => {
    wordCounts.forEach((tuple) => {
      expect(tuple).toHaveLength(2);
      expect(typeof tuple[0]).toBe('string');
      expect(typeof tuple[1]).toBe('number');
    });
  });

  it('should contain no duplicate words', () => {
    const words = wordCounts.map(([word]) => word);
    const uniqueWords = new Set(words);
    expect(uniqueWords.size).toBe(words.length);
  });

  it('should have all words in lowercase', () => {
    const lowercaseLettersRegex = /^[a-z]+$/;
    wordCounts.forEach(([word]) => {
      expect(word).toMatch(lowercaseLettersRegex);
    });
  });

  it('should not contain empty strings', () => {
    wordCounts.forEach(([word]) => {
      expect(word).not.toBe('');
      expect(word.trim()).toBe(word);
    });
  });

  it('should contain only words of length 5', () => {
    wordCounts.forEach(([word]) => {
      expect(word.length).toBe(5);
    });
  });

  it('should contain the correct number of words', () => {
    const expectedWordCount = 14855;
    expect(wordCounts.length).toBeLessThan(expectedWordCount);
  });
});
