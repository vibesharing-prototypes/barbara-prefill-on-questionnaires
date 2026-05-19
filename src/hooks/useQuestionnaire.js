import { useCallback, useMemo } from 'react';
import { useQuestionnaireContext } from '../context/QuestionnaireContext';

/**
 * Custom hook for questionnaire CRUD operations
 */
export function useQuestionnaire(questionnaireId) {
  const {
    getQuestionnaire,
    updateQuestionnaire,
    addAnswer,
    updateAnswers,
    getParticipantAnswers,
    getQuestionAnswers,
  } = useQuestionnaireContext();

  const questionnaire = useMemo(
    () => getQuestionnaire(questionnaireId),
    [getQuestionnaire, questionnaireId]
  );

  const allQuestions = useMemo(() => {
    if (!questionnaire) return [];
    return questionnaire.pages.flatMap(page => page.questions);
  }, [questionnaire]);

  const getAnswer = useCallback((questionId, participantId = 'default') => {
    if (!questionnaire) return null;

    // First try to find participant-specific answer
    const participantAnswer = questionnaire.answers.find(
      a => a.questionId === questionId && a.participantId === participantId
    );

    if (participantAnswer) return participantAnswer;

    // If no participant-specific answer and participantId is not 'default',
    // fall back to default answer
    if (participantId !== 'default') {
      const defaultAnswer = questionnaire.answers.find(
        a => a.questionId === questionId && a.participantId === 'default'
      );
      return defaultAnswer;
    }

    return null;
  }, [questionnaire]);

  const setAnswer = useCallback((questionId, value, participantId = 'default', isPrefilled = false) => {
    if (!questionnaireId) return;

    const answer = {
      questionId,
      participantId,
      value,
      isPrefilled,
      confidenceScore: isPrefilled ? 0.85 : undefined,
    };

    addAnswer(questionnaireId, answer);
  }, [questionnaireId, addAnswer]);

  const updateMultipleAnswers = useCallback((answers) => {
    if (!questionnaireId) return;
    updateAnswers(questionnaireId, answers);
  }, [questionnaireId, updateAnswers]);

  const getQuestionById = useCallback((questionId) => {
    return allQuestions.find(q => q.id === questionId);
  }, [allQuestions]);

  const getPageQuestions = useCallback((pageId) => {
    if (!questionnaire) return [];
    const page = questionnaire.pages.find(p => p.id === pageId);
    return page?.questions || [];
  }, [questionnaire]);

  return {
    questionnaire,
    allQuestions,
    getAnswer,
    setAnswer,
    updateMultipleAnswers,
    getQuestionById,
    getPageQuestions,
    getParticipantAnswers: (participantId) => getParticipantAnswers(questionnaireId, participantId),
    getQuestionAnswers: (questionId) => getQuestionAnswers(questionnaireId, questionId),
    updateQuestionnaire: (updates) => updateQuestionnaire(questionnaireId, updates),
  };
}

export default useQuestionnaire;
