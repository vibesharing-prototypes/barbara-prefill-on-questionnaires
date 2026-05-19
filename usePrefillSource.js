import { useCallback, useState } from 'react';
import { useQuestionnaireContext } from '../context/QuestionnaireContext';
import Papa from 'papaparse';
import { parseCSVToFields } from '../utils/mockDataGenerator';

/**
 * Custom hook for handling prefill sources
 */
export function usePrefillSource() {
  const {
    prefillSources,
    activePrefillSource,
    setActivePrefillSource,
    addPrefillSource,
  } = useQuestionnaireContext();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Select a previous questionnaire as source
  const selectQuestionnaireSource = useCallback((questionnaireId) => {
    const source = prefillSources.find(
      s => s.type === 'previous_questionnaire' && s.questionnaireId === questionnaireId
    );
    if (source) {
      setActivePrefillSource(source);
      setError(null);
    }
  }, [prefillSources, setActivePrefillSource]);

  // Select board info as source
  const selectBoardSource = useCallback(() => {
    const source = prefillSources.find(s => s.type === 'board');
    if (source) {
      setActivePrefillSource(source);
      setError(null);
    }
  }, [prefillSources, setActivePrefillSource]);

  // Parse CSV file
  const parseCSVFile = useCallback((file) => {
    return new Promise((resolve, reject) => {
      setIsProcessing(true);
      setError(null);

      Papa.parse(file, {
        complete: (results) => {
          try {
            if (results.errors.length > 0) {
              throw new Error('CSV parsing errors: ' + results.errors[0].message);
            }

            const fields = [];
            const headers = results.data[0];

            if (!headers || headers.length === 0) {
              throw new Error('CSV file is empty or has no headers');
            }

            // Process each row (skip header)
            for (let i = 1; i < results.data.length; i++) {
              const row = results.data[i];
              if (row && row.length > 0 && row[0]) { // Skip empty rows
                headers.forEach((header, index) => {
                  if (header && row[index]) {
                    fields.push({
                      key: header.toLowerCase().replace(/\s+/g, '_'),
                      label: header,
                      value: row[index],
                    });
                  }
                });
                break; // Only take first data row for POC
              }
            }

            const source = {
              type: 'file',
              name: file.name,
              data: { fields },
              uploadedDate: new Date(),
            };

            addPrefillSource(source);
            setActivePrefillSource(source);
            setIsProcessing(false);
            resolve(source);
          } catch (err) {
            setError(err.message);
            setIsProcessing(false);
            reject(err);
          }
        },
        error: (error) => {
          setError('Failed to parse CSV: ' + error.message);
          setIsProcessing(false);
          reject(error);
        },
      });
    });
  }, [addPrefillSource, setActivePrefillSource]);

  // Parse URL data (mock implementation)
  const parseURLSource = useCallback(async (url) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const source = {
        type: 'url',
        name: url,
        data: {
          fields: [
            { key: 'company_name', label: 'Company Name', value: 'Sample Corp' },
            { key: 'industry', label: 'Industry', value: 'Technology' },
          ],
        },
        uploadedDate: new Date(),
      };

      addPrefillSource(source);
      setActivePrefillSource(source);
      setIsProcessing(false);
      return source;
    } catch (err) {
      setError('Failed to fetch URL data: ' + err.message);
      setIsProcessing(false);
      throw err;
    }
  }, [addPrefillSource, setActivePrefillSource]);

  // Get source fields
  const getSourceFields = useCallback(() => {
    if (!activePrefillSource) return [];
    return activePrefillSource.data?.fields || [];
  }, [activePrefillSource]);

  // Select manual prefill mode
  const selectManualSource = useCallback(() => {
    const source = {
      type: 'manual',
      name: 'Manual Entry',
      data: { fields: [] },
    };
    setActivePrefillSource(source);
    setError(null);
    return source;
  }, [setActivePrefillSource]);

  // Clear active source
  const clearSource = useCallback(() => {
    setActivePrefillSource(null);
    setError(null);
  }, [setActivePrefillSource]);

  return {
    prefillSources,
    activePrefillSource,
    isProcessing,
    error,
    selectQuestionnaireSource,
    selectBoardSource,
    parseCSVFile,
    parseURLSource,
    selectManualSource,
    getSourceFields,
    clearSource,
  };
}

export default usePrefillSource;
