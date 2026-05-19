// Utility functions for generating mock data

/**
 * Generate mock answers for a questionnaire based on prefill data
 */
export function generateMockAnswers(questionnaire, prefillSource, participantIds = ['default']) {
  const answers = [];

  if (!prefillSource || !prefillSource.data || !prefillSource.data.fields) {
    return answers;
  }

  const sourceFields = prefillSource.data.fields;

  participantIds.forEach(participantId => {
    questionnaire.pages.forEach(page => {
      page.questions.forEach(question => {
        // Try to find matching field from source
        const matchingField = sourceFields.find(field =>
          field.label.toLowerCase().includes(question.text.toLowerCase().split(' ').slice(0, 3).join(' ').toLowerCase())
        );

        if (matchingField) {
          answers.push({
            questionId: question.id,
            participantId,
            value: matchingField.value,
            isPrefilled: true,
            confidenceScore: 0.85,
          });
        }
      });
    });
  });

  return answers;
}

/**
 * Generate individual answers for multiple participants
 */
export function generateIndividualAnswers(questions, participants, variationFactor = 0.1) {
  const answers = [];

  participants.forEach(participant => {
    questions.forEach(question => {
      let value;

      switch (question.type) {
        case 'number':
          value = Math.floor(Math.random() * 1000 * (1 + variationFactor));
          break;
        case 'dropdown':
          value = question.options?.[Math.floor(Math.random() * question.options.length)] || '';
          break;
        case 'text':
          value = `Answer from ${participant.name}`;
          break;
        case 'multiline':
          value = `Detailed response provided by ${participant.name} for this question.`;
          break;
        case 'date':
          value = new Date().toISOString().split('T')[0];
          break;
        default:
          value = '';
      }

      answers.push({
        questionId: question.id,
        participantId: participant.id,
        value,
        isPrefilled: true,
        confidenceScore: Math.random() * 0.3 + 0.7, // 0.7 to 1.0
      });
    });
  });

  return answers;
}

/**
 * Parse CSV data into fields
 */
export function parseCSVToFields(csvData) {
  const lines = csvData.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const values = lines[1].split(',').map(v => v.trim());

  return headers.map((header, index) => ({
    key: header.toLowerCase().replace(/\s+/g, '_'),
    label: header,
    value: values[index] || '',
  }));
}

/**
 * Calculate string similarity score (0-1)
 */
export function calculateSimilarity(str1, str2) {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  if (s1 === s2) return 1.0;

  // Simple word overlap calculation
  const words1 = new Set(s1.split(/\s+/));
  const words2 = new Set(s2.split(/\s+/));

  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

/**
 * Generate comparison data between two questionnaires
 */
export function generateComparisonData(currentQuestionnaire, previousQuestionnaire) {
  const changes = {
    newQuestions: [],
    removedQuestions: [],
    modifiedQuestions: [],
    unchangedQuestions: [],
  };

  const prevQuestionMap = new Map();
  previousQuestionnaire.pages.forEach(page => {
    page.questions.forEach(q => prevQuestionMap.set(q.text.toLowerCase(), q));
  });

  const currentQuestionTexts = new Set();
  currentQuestionnaire.pages.forEach(page => {
    page.questions.forEach(question => {
      currentQuestionTexts.add(question.text.toLowerCase());
      const prevQuestion = prevQuestionMap.get(question.text.toLowerCase());

      if (!prevQuestion) {
        changes.newQuestions.push(question);
      } else if (JSON.stringify(question) !== JSON.stringify(prevQuestion)) {
        changes.modifiedQuestions.push({ current: question, previous: prevQuestion });
      } else {
        changes.unchangedQuestions.push(question);
      }
    });
  });

  // Find removed questions
  prevQuestionMap.forEach((question, text) => {
    if (!currentQuestionTexts.has(text)) {
      changes.removedQuestions.push(question);
    }
  });

  return changes;
}

export default {
  generateMockAnswers,
  generateIndividualAnswers,
  parseCSVToFields,
  calculateSimilarity,
  generateComparisonData,
};
