import { createContext, useContext, useState, useCallback } from 'react';
import { mockQuestionnaires } from '../data/mockQuestionnaires';
import { mockParticipants } from '../data/mockParticipants';
import { mockPrefillSources } from '../data/mockPrefillSources';

const QuestionnaireContext = createContext();

export function QuestionnaireProvider({ children }) {
  const [questionnaires, setQuestionnaires] = useState(mockQuestionnaires);
  const [participants, setParticipants] = useState(mockParticipants);
  const [prefillSources, setPrefillSources] = useState(mockPrefillSources);
  const [activeQuestionnaire, setActiveQuestionnaire] = useState(null);
  const [activePrefillSource, setActivePrefillSource] = useState(null);
  const [fieldMappings, setFieldMappings] = useState([]);
  const [prefillLayout, setPrefillLayout] = useState('default'); // 'default' | 'by-person' | 'by-question'
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Get questionnaire by ID
  const getQuestionnaire = useCallback((id) => {
    return questionnaires.find(q => q.id === id);
  }, [questionnaires]);

  // Update questionnaire
  const updateQuestionnaire = useCallback((id, updates) => {
    setQuestionnaires(prev =>
      prev.map(q => q.id === id ? { ...q, ...updates } : q)
    );
  }, []);

  // Add answer to questionnaire
  const addAnswer = useCallback((questionnaireId, answer) => {
    setQuestionnaires(prev =>
      prev.map(q => {
        if (q.id === questionnaireId) {
          const existingIndex = q.answers.findIndex(
            a => a.questionId === answer.questionId && a.participantId === answer.participantId
          );

          const newAnswers = [...q.answers];
          if (existingIndex >= 0) {
            newAnswers[existingIndex] = answer;
          } else {
            newAnswers.push(answer);
          }

          return { ...q, answers: newAnswers };
        }
        return q;
      })
    );
  }, []);

  // Update multiple answers
  const updateAnswers = useCallback((questionnaireId, answers) => {
    setQuestionnaires(prev =>
      prev.map(q => {
        if (q.id === questionnaireId) {
          const answerMap = new Map(
            q.answers.map(a => [`${a.questionId}-${a.participantId}`, a])
          );

          answers.forEach(answer => {
            const key = `${answer.questionId}-${answer.participantId}`;
            answerMap.set(key, answer);
          });

          return { ...q, answers: Array.from(answerMap.values()) };
        }
        return q;
      })
    );
  }, []);

  // Get answers for a specific participant
  const getParticipantAnswers = useCallback((questionnaireId, participantId) => {
    const questionnaire = getQuestionnaire(questionnaireId);
    if (!questionnaire) return [];
    return questionnaire.answers.filter(a => a.participantId === participantId);
  }, [getQuestionnaire]);

  // Get answers for a specific question
  const getQuestionAnswers = useCallback((questionnaireId, questionId) => {
    const questionnaire = getQuestionnaire(questionnaireId);
    if (!questionnaire) return [];
    return questionnaire.answers.filter(a => a.questionId === questionId);
  }, [getQuestionnaire]);

  // Add prefill source
  const addPrefillSource = useCallback((source) => {
    setPrefillSources(prev => [...prev, { ...source, id: `source-${Date.now()}` }]);
  }, []);

  // Update field mappings
  const updateFieldMappings = useCallback((mappings) => {
    setFieldMappings(mappings);
  }, []);

  // Apply prefill mappings to questionnaire
  const applyPrefillMappings = useCallback((questionnaireId, participantId = 'default') => {
    if (!activePrefillSource || !fieldMappings.length) return;

    const sourceFields = activePrefillSource.data?.fields || [];
    const newAnswers = [];

    fieldMappings.forEach(mapping => {
      const sourceField = sourceFields.find(f => f.key === mapping.sourceField || f.label === mapping.sourceField);
      if (sourceField && mapping.targetQuestionId) {
        newAnswers.push({
          questionId: mapping.targetQuestionId,
          participantId,
          value: sourceField.value,
          isPrefilled: true,
          confidenceScore: mapping.confidenceScore,
        });
      }
    });

    updateAnswers(questionnaireId, newAnswers);
  }, [activePrefillSource, fieldMappings, updateAnswers]);

  // Clear prefilled answers from questionnaire
  const clearPrefilledAnswers = useCallback((questionnaireId) => {
    setQuestionnaires(prev =>
      prev.map(q => {
        if (q.id === questionnaireId) {
          // Remove all prefilled answers, keep only manually entered ones
          const nonPrefilledAnswers = q.answers.filter(a => !a.isPrefilled);
          return { ...q, answers: nonPrefilledAnswers };
        }
        return q;
      })
    );
  }, []);

  // Clear all answers from questionnaire (for manual prefill)
  const clearAllAnswers = useCallback((questionnaireId) => {
    setQuestionnaires(prev =>
      prev.map(q => {
        if (q.id === questionnaireId) {
          return { ...q, answers: [] };
        }
        return q;
      })
    );
  }, []);

  const value = {
    // State
    questionnaires,
    participants,
    prefillSources,
    activeQuestionnaire,
    activePrefillSource,
    fieldMappings,
    prefillLayout,
    selectedParticipant,
    selectedQuestion,

    // Setters
    setActiveQuestionnaire,
    setActivePrefillSource,
    setFieldMappings,
    setPrefillLayout,
    setSelectedParticipant,
    setSelectedQuestion,

    // Methods
    getQuestionnaire,
    updateQuestionnaire,
    addAnswer,
    updateAnswers,
    getParticipantAnswers,
    getQuestionAnswers,
    addPrefillSource,
    updateFieldMappings,
    applyPrefillMappings,
    clearPrefilledAnswers,
    clearAllAnswers,
  };

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaireContext() {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaireContext must be used within QuestionnaireProvider');
  }
  return context;
}

export default QuestionnaireContext;
