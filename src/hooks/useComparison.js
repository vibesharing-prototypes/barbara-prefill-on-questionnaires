import { useMemo, useCallback } from 'react';
import { generateComparisonData } from '../utils/mockDataGenerator';

/**
 * Custom hook for questionnaire comparison logic
 */
export function useComparison(currentQuestionnaire, previousQuestionnaire) {
  // Generate comparison data
  const comparisonData = useMemo(() => {
    if (!currentQuestionnaire || !previousQuestionnaire) return null;
    return generateComparisonData(currentQuestionnaire, previousQuestionnaire);
  }, [currentQuestionnaire, previousQuestionnaire]);

  // Find matching previous question for current question
  const findPreviousQuestion = useCallback((currentQuestion) => {
    if (!previousQuestionnaire) return null;

    for (const page of previousQuestionnaire.pages) {
      const match = page.questions.find(
        q => q.text.toLowerCase() === currentQuestion.text.toLowerCase()
      );
      if (match) return match;
    }

    return null;
  }, [previousQuestionnaire]);

  // Find previous answer for a question
  const findPreviousAnswer = useCallback((currentQuestionId, participantId = 'default') => {
    if (!previousQuestionnaire) return null;

    const currentQuestion = currentQuestionnaire?.pages
      .flatMap(p => p.questions)
      .find(q => q.id === currentQuestionId);

    if (!currentQuestion) return null;

    const previousQuestion = findPreviousQuestion(currentQuestion);
    if (!previousQuestion) return null;

    return previousQuestionnaire.answers.find(
      a => a.questionId === previousQuestion.id && a.participantId === participantId
    );
  }, [previousQuestionnaire, currentQuestionnaire, findPreviousQuestion]);

  // Calculate word-level diff between two strings
  const calculateWordDiff = useCallback((oldText, newText) => {
    const oldWords = oldText.split(/\s+/);
    const newWords = newText.split(/\s+/);
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
  }, []);

  // Get change type for a question
  const getQuestionChangeType = useCallback((question) => {
    if (!comparisonData) return 'unchanged';

    if (comparisonData.newQuestions.find(q => q.id === question.id)) {
      return 'new';
    }

    if (comparisonData.modifiedQuestions.find(m => m.current.id === question.id)) {
      return 'modified';
    }

    return 'unchanged';
  }, [comparisonData]);

  // Check if a question was removed
  const isQuestionRemoved = useCallback((question) => {
    if (!comparisonData) return false;
    return comparisonData.removedQuestions.find(q => q.id === question.id) !== undefined;
  }, [comparisonData]);

  // Get answer change info
  const getAnswerChange = useCallback((currentAnswer, questionId, participantId) => {
    const previousAnswer = findPreviousAnswer(questionId, participantId);

    if (!previousAnswer) {
      return { hasChanged: false, previousValue: null };
    }

    const hasChanged = String(currentAnswer) !== String(previousAnswer.value);

    return {
      hasChanged,
      previousValue: previousAnswer.value,
      currentValue: currentAnswer,
    };
  }, [findPreviousAnswer]);

  // Calculate summary statistics
  const statistics = useMemo(() => {
    if (!comparisonData) {
      return {
        totalNew: 0,
        totalModified: 0,
        totalRemoved: 0,
        totalUnchanged: 0,
        totalQuestions: 0,
      };
    }

    return {
      totalNew: comparisonData.newQuestions.length,
      totalModified: comparisonData.modifiedQuestions.length,
      totalRemoved: comparisonData.removedQuestions.length,
      totalUnchanged: comparisonData.unchangedQuestions.length,
      totalQuestions:
        comparisonData.newQuestions.length +
        comparisonData.modifiedQuestions.length +
        comparisonData.unchangedQuestions.length,
    };
  }, [comparisonData]);

  return {
    comparisonData,
    findPreviousQuestion,
    findPreviousAnswer,
    calculateWordDiff,
    getQuestionChangeType,
    isQuestionRemoved,
    getAnswerChange,
    statistics,
  };
}

export default useComparison;
