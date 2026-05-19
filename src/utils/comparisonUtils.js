/**
 * Utility functions for questionnaire comparison
 */

/**
 * Calculate word-level differences between two strings
 */
export function wordDiff(oldText, newText) {
  const oldWords = oldText.split(/(\s+)/);
  const newWords = newText.split(/(\s+)/);

  const diff = [];
  const maxLen = Math.max(oldWords.length, newWords.length);

  for (let i = 0; i < maxLen; i++) {
    const oldWord = oldWords[i];
    const newWord = newWords[i];

    if (oldWord === newWord) {
      diff.push({ type: 'unchanged', text: oldWord });
    } else if (!oldWord) {
      diff.push({ type: 'added', text: newWord });
    } else if (!newWord) {
      diff.push({ type: 'removed', text: oldWord });
    } else {
      diff.push({ type: 'removed', text: oldWord });
      diff.push({ type: 'added', text: newWord });
    }
  }

  return diff;
}

/**
 * Calculate character-level differences between two strings
 */
export function charDiff(oldText, newText) {
  const diff = [];
  const maxLen = Math.max(oldText.length, newText.length);

  for (let i = 0; i < maxLen; i++) {
    const oldChar = oldText[i];
    const newChar = newText[i];

    if (oldChar === newChar) {
      diff.push({ type: 'unchanged', char: oldChar });
    } else if (!oldChar) {
      diff.push({ type: 'added', char: newChar });
    } else if (!newChar) {
      diff.push({ type: 'removed', char: oldChar });
    } else {
      diff.push({ type: 'removed', char: oldChar });
      diff.push({ type: 'added', char: newChar });
    }
  }

  return diff;
}

/**
 * Detect change type for a question
 */
export function detectChangeType(currentQuestion, previousQuestion) {
  if (!previousQuestion) return 'new';
  if (!currentQuestion) return 'removed';

  // Check for modifications
  if (currentQuestion.text !== previousQuestion.text) return 'modified';
  if (currentQuestion.type !== previousQuestion.type) return 'modified';
  if (currentQuestion.required !== previousQuestion.required) return 'modified';

  // Check options
  const currentOptions = currentQuestion.options || [];
  const previousOptions = previousQuestion.options || [];

  if (currentOptions.length !== previousOptions.length) return 'modified';
  if (!currentOptions.every((opt, idx) => opt === previousOptions[idx])) return 'modified';

  return 'unchanged';
}

/**
 * Find matching question in another questionnaire
 */
export function findMatchingQuestion(question, questionnaire) {
  for (const page of questionnaire.pages) {
    const match = page.questions.find(
      q => q.text.toLowerCase().trim() === question.text.toLowerCase().trim()
    );
    if (match) return match;
  }
  return null;
}

/**
 * Calculate similarity percentage between two questions
 */
export function calculateQuestionSimilarity(q1, q2) {
  let score = 0;
  let total = 0;

  // Text similarity (most important)
  total += 5;
  if (q1.text === q2.text) score += 5;
  else if (q1.text.toLowerCase() === q2.text.toLowerCase()) score += 4;
  else {
    const words1 = q1.text.toLowerCase().split(/\s+/);
    const words2 = q2.text.toLowerCase().split(/\s+/);
    const commonWords = words1.filter(w => words2.includes(w)).length;
    score += (commonWords / Math.max(words1.length, words2.length)) * 5;
  }

  // Type match
  total += 2;
  if (q1.type === q2.type) score += 2;

  // Required match
  total += 1;
  if (q1.required === q2.required) score += 1;

  // Options match
  if (q1.options && q2.options) {
    total += 2;
    const commonOptions = q1.options.filter(o => q2.options.includes(o)).length;
    score += (commonOptions / Math.max(q1.options.length, q2.options.length)) * 2;
  }

  return (score / total) * 100;
}

/**
 * Group questions by change type
 */
export function groupQuestionsByChangeType(currentQuestions, previousQuestions) {
  const groups = {
    new: [],
    removed: [],
    modified: [],
    unchanged: [],
  };

  const previousMap = new Map(
    previousQuestions.map(q => [q.text.toLowerCase().trim(), q])
  );

  const processedPrevious = new Set();

  // Process current questions
  currentQuestions.forEach(currentQ => {
    const key = currentQ.text.toLowerCase().trim();
    const previousQ = previousMap.get(key);

    if (!previousQ) {
      groups.new.push(currentQ);
    } else {
      processedPrevious.add(key);
      const changeType = detectChangeType(currentQ, previousQ);
      if (changeType === 'modified') {
        groups.modified.push({ current: currentQ, previous: previousQ });
      } else {
        groups.unchanged.push(currentQ);
      }
    }
  });

  // Find removed questions
  previousQuestions.forEach(prevQ => {
    const key = prevQ.text.toLowerCase().trim();
    if (!processedPrevious.has(key)) {
      groups.removed.push(prevQ);
    }
  });

  return groups;
}

export default {
  wordDiff,
  charDiff,
  detectChangeType,
  findMatchingQuestion,
  calculateQuestionSimilarity,
  groupQuestionsByChangeType,
};
