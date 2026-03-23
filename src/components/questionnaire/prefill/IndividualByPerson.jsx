import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Chip,
  Alert,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useQuestionnaireContext } from '../../../context/QuestionnaireContext';
import QuestionCard from '../shared/QuestionCard';
import ParticipantChip from '../shared/ParticipantChip';
import { useQuestionnaire } from '../../../hooks/useQuestionnaire';

function IndividualByPerson({ questionnaire }) {
  const { participants, selectedParticipant, setSelectedParticipant } = useQuestionnaireContext();
  const { getParticipantAnswers, getAnswer } = useQuestionnaire(questionnaire.id);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (participants.length > 0 && !selectedParticipant) {
      setSelectedParticipant(participants[0]);
      setCurrentIndex(0);
    }
  }, [participants, selectedParticipant, setSelectedParticipant]);

  const handleParticipantChange = (event) => {
    const participantId = event.target.value;
    const participant = participants.find(p => p.id === participantId);
    const index = participants.findIndex(p => p.id === participantId);
    setSelectedParticipant(participant);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedParticipant(participants[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex < participants.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedParticipant(participants[newIndex]);
    }
  };

  if (!selectedParticipant) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography>No participants available</Typography>
      </Paper>
    );
  }

  const participantAnswers = getParticipantAnswers(selectedParticipant.id);

  // Count prefilled answers (including from default)
  const allQuestions = questionnaire.pages.flatMap(page => page.questions);
  const prefilledCount = allQuestions.filter(q => {
    const answer = getAnswer(q.id, selectedParticipant.id);
    return answer?.isPrefilled;
  }).length;

  // Count answers using default
  const usingDefaultCount = allQuestions.filter(q => {
    const answer = getAnswer(q.id, selectedParticipant.id);
    return answer?.participantId === 'default';
  }).length;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel>Select Participant</InputLabel>
            <Select
              value={selectedParticipant.id}
              onChange={handleParticipantChange}
              label="Select Participant"
            >
              {participants.map((participant) => (
                <MenuItem key={participant.id} value={participant.id}>
                  {participant.name} - {participant.role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Chip
            label={`${prefilledCount} prefilled answers`}
            color="primary"
            variant="outlined"
          />
          {usingDefaultCount > 0 && (
            <Chip
              label={`${usingDefaultCount} using default values`}
              color="info"
              variant="outlined"
            />
          )}
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            startIcon={<NavigateBeforeIcon />}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          <Typography variant="body2" color="text.secondary">
            {currentIndex + 1} of {participants.length}
          </Typography>
          <Button
            endIcon={<NavigateNextIcon />}
            onClick={handleNext}
            disabled={currentIndex === participants.length - 1}
          >
            Next
          </Button>
        </Stack>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {selectedParticipant.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {selectedParticipant.role} • {selectedParticipant.email}
        </Typography>
      </Box>

      {usingDefaultCount > 0 && (
        <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 3 }}>
          This participant is using {usingDefaultCount} default value{usingDefaultCount > 1 ? 's' : ''}.
          Fields with a dashed border and 📋 icon are showing default values.
          Edit any field to override the default for this specific participant.
        </Alert>
      )}

      <Stack spacing={2}>
        {questionnaire.pages.map((page) => (
          <Accordion key={page.id} defaultExpanded={page.order === 1}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                {page.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                {page.questions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    questionnaireId={questionnaire.id}
                    participantId={selectedParticipant.id}
                    showPrefillIndicator
                  />
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  );
}

export default IndividualByPerson;
