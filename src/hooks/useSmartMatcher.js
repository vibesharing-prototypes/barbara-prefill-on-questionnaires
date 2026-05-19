import { useCallback, useMemo, useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useQuestionnaireContext } from '../context/QuestionnaireContext';

/**
 * Custom hook for smart field matching between source and target questions
 */
export function useSmartMatcher(questions, sourceFields) {
  const { fieldMappings, updateFieldMappings } = useQuestionnaireContext();
  const [autoMatchCompleted, setAutoMatchCompleted] = useState(false);

  // Configure Fuse.js for fuzzy matching
  const fuse = useMemo(() => {
    if (!questions || questions.length === 0) return null;

    return new Fuse(questions, {
      keys: ['text'],
      threshold: 0.4, // 0 = perfect match, 1 = match anything
      distance: 100,
      includeScore: true,
    });
  }, [questions]);

  // Calculate confidence score (inverse of Fuse score, normalized to 0-1)
  const calculateConfidence = useCallback((fuseScore) => {
    if (!fuseScore) return 0;
    // Fuse score: 0 = perfect, 1 = worst
    // Confidence: 1 = perfect, 0 = worst
    return Math.max(0, Math.min(1, 1 - fuseScore));
  }, []);

  // Find best match for a source field
  const findBestMatch = useCallback((sourceField) => {
    if (!fuse) return null;

    const searchText = sourceField.label || sourceField.key;
    const results = fuse.search(searchText);

    if (results.length === 0) return null;

    const bestMatch = results[0];
    return {
      targetQuestionId: bestMatch.item.id,
      targetQuestionText: bestMatch.item.text,
      confidenceScore: calculateConfidence(bestMatch.score),
      sourceField: sourceField.label || sourceField.key,
    };
  }, [fuse, calculateConfidence]);

  // Auto-match all fields
  const autoMatch = useCallback(() => {
    if (!sourceFields || sourceFields.length === 0 || !fuse) return;

    const newMappings = [];

    sourceFields.forEach(field => {
      const match = findBestMatch(field);
      if (match && match.confidenceScore >= 0.3) { // Only include matches above threshold
        newMappings.push({
          sourceField: field.label || field.key,
          targetQuestionId: match.targetQuestionId,
          confidenceScore: match.confidenceScore,
          isManualOverride: false,
        });
      }
    });

    updateFieldMappings(newMappings);
    setAutoMatchCompleted(true);
  }, [sourceFields, fuse, findBestMatch, updateFieldMappings]);

  // Manually override a mapping
  const manualOverride = useCallback((sourceField, targetQuestionId) => {
    const newMappings = [...fieldMappings];
    const existingIndex = newMappings.findIndex(m => m.sourceField === sourceField);

    const mapping = {
      sourceField,
      targetQuestionId,
      confidenceScore: 1.0, // Manual override has perfect confidence
      isManualOverride: true,
    };

    if (existingIndex >= 0) {
      newMappings[existingIndex] = mapping;
    } else {
      newMappings.push(mapping);
    }

    updateFieldMappings(newMappings);
  }, [fieldMappings, updateFieldMappings]);

  // Remove a mapping
  const removeMapping = useCallback((sourceField) => {
    const newMappings = fieldMappings.filter(m => m.sourceField !== sourceField);
    updateFieldMappings(newMappings);
  }, [fieldMappings, updateFieldMappings]);

  // Clear all mappings
  const clearAllMappings = useCallback(() => {
    updateFieldMappings([]);
    setAutoMatchCompleted(false);
  }, [updateFieldMappings]);

  // Get mapping for a source field
  const getMapping = useCallback((sourceField) => {
    return fieldMappings.find(m => m.sourceField === sourceField);
  }, [fieldMappings]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = sourceFields?.length || 0;
    const matched = fieldMappings.length;
    const avgConfidence = matched > 0
      ? fieldMappings.reduce((sum, m) => sum + m.confidenceScore, 0) / matched
      : 0;

    const highConfidence = fieldMappings.filter(m => m.confidenceScore >= 0.8).length;
    const mediumConfidence = fieldMappings.filter(m => m.confidenceScore >= 0.5 && m.confidenceScore < 0.8).length;
    const lowConfidence = fieldMappings.filter(m => m.confidenceScore < 0.5).length;

    return {
      total,
      matched,
      unmatched: total - matched,
      avgConfidence: Math.round(avgConfidence * 100),
      highConfidence,
      mediumConfidence,
      lowConfidence,
    };
  }, [sourceFields, fieldMappings]);

  // Auto-match on initial load
  useEffect(() => {
    if (!autoMatchCompleted && sourceFields && sourceFields.length > 0 && questions && questions.length > 0) {
      autoMatch();
    }
  }, [sourceFields, questions, autoMatchCompleted, autoMatch]);

  return {
    fieldMappings,
    autoMatch,
    manualOverride,
    removeMapping,
    clearAllMappings,
    getMapping,
    findBestMatch,
    statistics,
    autoMatchCompleted,
  };
}

export default useSmartMatcher;
