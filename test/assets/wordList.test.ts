import { wordList } from '../../src/assets/wordList';

describe('wordList', () => {
  it('should contain only lowercase English letters', () => {
    const lowercaseLettersRegex = /^[a-z]+$/;

    wordList.forEach((word) => {
      expect(word).toMatch(lowercaseLettersRegex);
    });
  });

  it('should contain no duplicate words', () => {
    const uniqueWords = new Set(wordList);
    expect(uniqueWords.size).toBe(wordList.length);
  });

  it('should contain only words of length 5', () => {
    wordList.forEach((word) => {
      expect(word.length).toBe(5);
    });
  });

  it('should contain the correct number of words', () => {
    const expectedWordCount = 14808;
    expect(wordList.length).toBe(expectedWordCount);
  });

  it('should not contain empty strings or spaces', () => {
    wordList.forEach((word) => {
      expect(word).not.toBe('');
      expect(word.trim()).toBe(word);
    });
  });
});
