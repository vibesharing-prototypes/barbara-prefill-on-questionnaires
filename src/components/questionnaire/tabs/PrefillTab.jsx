import { useState } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import { useQuestionnaireContext } from '../../../context/QuestionnaireContext';
import SourceSelector from '../prefill/SourceSelector';
import SmartMatcher from '../prefill/SmartMatcher';
import PrefillLayoutSelector from '../prefill/PrefillLayoutSelector';
import DefaultPrefillView from '../prefill/DefaultPrefillView';
import IndividualByPerson from '../prefill/IndividualByPerson';
import IndividualByQuestion from '../prefill/IndividualByQuestion';

const steps = ['Select Source', 'Match Fields', 'Configure & Review'];

function PrefillTab({ questionnaire }) {
  const {
    activePrefillSource,
    prefillLayout,
    fieldMappings,
    clearAllAnswers,
    setFieldMappings,
  } = useQuestionnaireContext();
  const [activeStep, setActiveStep] = useState(0);
  const [matchingCompleted, setMatchingCompleted] = useState(false);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSourceSelected = (source) => {
    // If manual source, skip matching and go directly to step 2
    if (source && source.type === 'manual') {
      // Clear ALL answers since we're starting fresh with manual entry
      clearAllAnswers(questionnaire.id);
      // Clear field mappings since there's no source to map from
      setFieldMappings([]);
      setActiveStep(2);
      setMatchingCompleted(true);
    } else {
      handleNext();
    }
  };

  const handleMatchingComplete = () => {
    setMatchingCompleted(true);
    handleNext();
  };

  const handleCompare = () => {
    // Open comparison in new tab
    const compareUrl = `/questionnaire/${questionnaire.id}/compare/demo-esg-2024`;
    window.open(compareUrl, '_blank');
  };

  const handleStepClick = (step) => {
    // Allow navigation to any step if we have the required data
    if (step === 0) {
      // Can always go back to source selection
      setActiveStep(0);
    } else if (step === 1) {
      // Can go to matching if source is selected
      if (activePrefillSource) {
        setActiveStep(1);
      }
    } else if (step === 2) {
      // Can go to review if matching is completed
      if (matchingCompleted || fieldMappings.length > 0) {
        setActiveStep(2);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Prefill Data
        </Typography>
        <Button
          variant="outlined"
          onClick={handleCompare}
          disabled={!questionnaire.id.includes('2025')}
        >
          Compare with Previous Year
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const canNavigate =
              index === 0 ||
              (index === 1 && activePrefillSource) ||
              (index === 2 && (matchingCompleted || fieldMappings.length > 0));

            return (
              <Step key={label}>
                <StepLabel
                  sx={{ cursor: canNavigate ? 'pointer' : 'default' }}
                  onClick={() => canNavigate && handleStepClick(index)}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Paper>

      <Box>
        {activeStep === 0 && (
          <SourceSelector
            questionnaire={questionnaire}
            onSourceSelected={handleSourceSelected}
          />
        )}

        {activeStep === 1 && (
          <Box>
            <SmartMatcher
              questionnaire={questionnaire}
              onComplete={handleMatchingComplete}
            />
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button onClick={handleBack}>
                Back
              </Button>
            </Stack>
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <PrefillLayoutSelector />

            <Box sx={{ mt: 4 }}>
              {prefillLayout === 'default' && (
                <DefaultPrefillView questionnaire={questionnaire} />
              )}
              {prefillLayout === 'by-person' && (
                <IndividualByPerson questionnaire={questionnaire} />
              )}
              {prefillLayout === 'by-question' && (
                <IndividualByQuestion questionnaire={questionnaire} />
              )}
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" disabled>
                Save Prefill Data
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PrefillTab;
