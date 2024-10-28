import type { Feedback } from '../../src/types/index';
import { generateFeedback } from '../../src/utils/feedbackUtils';

describe('generateFeedback', () => {
  describe('Basic cases', () => {
    it('should return all green for correct guess', () => {
      const feedback: Feedback = new Uint8Array([1, 1, 1, 1, 1]);
      expect(generateFeedback('world', 'world')).toEqual(feedback);
    });

    it('should return all gray for completely wrong guess', () => {
      const feedback: Feedback = new Uint8Array([0, 0, 0, 0, 0]);
      expect(generateFeedback('world', 'fiefs')).toEqual(feedback);
    });

    it('should return yellow for letter contained in target', () => {
      const feedback: Feedback = new Uint8Array([0, 0, 2, 0, 0]);
      expect(generateFeedback('crown', 'hello')).toEqual(feedback);
    });
  });

  describe('Mixed feedback cases', () => {
    it('should handle mix of green, yellow, and gray', () => {
      const feedback: Feedback = new Uint8Array([1, 1, 1, 0, 2]);
      expect(generateFeedback('world', 'words')).toEqual(feedback);
    });
  });

  describe('Repeated letters in guess', () => {
    it('should generate correct feedback for "hello" and "world"', () => {
      const feedback: Feedback = new Uint8Array([0, 0, 0, 1, 2]);
      expect(generateFeedback('hello', 'world')).toEqual(feedback);
    });
  });

  describe('Repeated letters in target', () => {
    it('should generate correct feedback for "world" and "hello"', () => {
      const feedback: Feedback = new Uint8Array([0, 2, 0, 1, 0]);
      expect(generateFeedback('world', 'hello')).toEqual(feedback);
    });
  });

  describe('Repeated letters in both guess and target', () => {
    it('should generate correct feedback for "fiefs" and "fully"', () => {
      const feedback: Feedback = new Uint8Array([1, 0, 0, 0, 0]);
      expect(generateFeedback('fiefs', 'fully')).toEqual(feedback);
    });

    it('should generate correct feedback for "fluff" and "fully"', () => {
      const feedback: Feedback = new Uint8Array([1, 2, 2, 0, 0]);
      expect(generateFeedback('fluff', 'fully')).toEqual(feedback);
    });

    it('should generate correct feedback for "halal" and "fully"', () => {
      const feedback: Feedback = new Uint8Array([0, 0, 1, 0, 2]);
      expect(generateFeedback('halal', 'fully')).toEqual(feedback);
    });

    it('should generate correct feedback for "spill" and "fully"', () => {
      const feedback: Feedback = new Uint8Array([0, 0, 0, 1, 2]);
      expect(generateFeedback('spill', 'fully')).toEqual(feedback);
    });

    it('should generate correct feedback for "ladle" and "fully"', () => {
      const feedback: Feedback = new Uint8Array([2, 0, 0, 1, 0]);
      expect(generateFeedback('ladle', 'fully')).toEqual(feedback);
    });

    it('should generate correct feedback for "yawny" and "fully"', () => {
      const feedback: Feedback = new Uint8Array([0, 0, 0, 0, 1]);
      expect(generateFeedback('yawny', 'fully')).toEqual(feedback);
    });

    it('should generate correct feedback for "yoyos" and "fully"', () => {
      const feedback: Feedback = new Uint8Array([2, 0, 0, 0, 0]);
      expect(generateFeedback('yoyos', 'fully')).toEqual(feedback);
    });
  });

  describe('Repeated letters (additional tests)', () => {
    it('should generate correct feedback for "speed" and "abide"', () => {
      const feedback: Feedback = new Uint8Array([0, 0, 2, 0, 2]);
      expect(generateFeedback('speed', 'abide')).toEqual(feedback);
    });

    it('should generate correct feedback for "speed" and "erase"', () => {
      const feedback: Feedback = new Uint8Array([2, 0, 2, 2, 0]);
      expect(generateFeedback('speed', 'erase')).toEqual(feedback);
    });

    it('should generate correct feedback for "speed" and "steal"', () => {
      const feedback: Feedback = new Uint8Array([1, 0, 1, 0, 0]);
      expect(generateFeedback('speed', 'steal')).toEqual(feedback);
    });

    it('should generate correct feedback for "speed" and "crepe"', () => {
      const feedback: Feedback = new Uint8Array([0, 2, 1, 2, 0]);
      expect(generateFeedback('speed', 'crepe')).toEqual(feedback);
    });
  });
});
