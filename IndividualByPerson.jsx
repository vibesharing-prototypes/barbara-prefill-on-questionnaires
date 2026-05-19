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
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  LinearProgress,
  TextField,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from '@mui/icons-material';
import { useQuestionnaireContext } from '../../../context/QuestionnaireContext';
import QuestionCard from '../shared/QuestionCard';
import ParticipantChip from '../shared/ParticipantChip';
import { useQuestionnaire } from '../../../hooks/useQuestionnaire';

function IndividualByPerson({ questionnaire }) {
  const {
    participants,
    selectedParticipant,
    setSelectedParticipant,
    updateParticipantStatus,
    getParticipantStatus,
  } = useQuestionnaireContext();
  const { getParticipantAnswers, getAnswer } = useQuestionnaire(questionnaire.id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const handleChipClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleParticipantClickFromDrawer = (participant) => {
    const index = participants.findIndex(p => p.id === participant.id);
    setSelectedParticipant(participant);
    setCurrentIndex(index);
    setDrawerOpen(false);
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    const currentStatus = getParticipantStatus(selectedParticipant.id);
    updateParticipantStatus(selectedParticipant.id, newStatus, currentStatus.notes);
  };

  const handleNotesChange = (event) => {
    const newNotes = event.target.value;
    const currentStatus = getParticipantStatus(selectedParticipant.id);
    updateParticipantStatus(selectedParticipant.id, currentStatus.status, newNotes);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'not-started':
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'complete':
        return 'Complete';
      case 'in-progress':
        return 'In Progress';
      case 'not-started':
      default:
        return 'Not Started';
    }
  };

  // Calculate prefill status for all participants
  const allQuestions = questionnaire.pages.flatMap(page => page.questions);
  const participantsStatus = participants.map(participant => {
    const prefilledCount = allQuestions.filter(q => {
      const answer = getAnswer(q.id, participant.id);
      return answer?.isPrefilled;
    }).length;
    const totalQuestions = allQuestions.length;
    const percentage = totalQuestions > 0 ? (prefilledCount / totalQuestions) * 100 : 0;
    const status = getParticipantStatus(participant.id);

    return {
      participant,
      prefilledCount,
      totalQuestions,
      percentage,
      status: status.status,
      notes: status.notes,
    };
  });

  if (!selectedParticipant) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography>No participants available</Typography>
      </Paper>
    );
  }

  const participantAnswers = getParticipantAnswers(selectedParticipant.id);

  // Count prefilled answers (including from default)
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
            onClick={handleChipClick}
            sx={{ cursor: 'pointer' }}
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

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {selectedParticipant.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedParticipant.role} • {selectedParticipant.email}
            </Typography>
          </Box>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={getParticipantStatus(selectedParticipant.id).status}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="not-started">Not Started</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="complete">Complete</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          fullWidth
          multiline
          rows={2}
          label="Notes"
          placeholder="Add notes about this participant's prefill progress..."
          value={getParticipantStatus(selectedParticipant.id).notes}
          onChange={handleNotesChange}
          size="small"
        />
      </Paper>

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

      {/* Participants Status Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 400,
            maxWidth: '90vw',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Participants Prefill Status</Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {participantsStatus.map(({ participant, prefilledCount, totalQuestions, percentage, status, notes }) => (
            <ListItem key={participant.id} disablePadding>
              <ListItemButton
                onClick={() => handleParticipantClickFromDrawer(participant)}
                selected={selectedParticipant?.id === participant.id}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {percentage === 100 ? (
                          <CheckCircleIcon color="success" fontSize="small" />
                        ) : (
                          <RadioButtonUncheckedIcon color="disabled" fontSize="small" />
                        )}
                        <Typography>{participant.name}</Typography>
                      </Box>
                      <Chip
                        label={getStatusLabel(status)}
                        color={getStatusColor(status)}
                        size="small"
                      />
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {participant.role}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <LinearProgress
                          variant="determinate"
                          value={percentage}
                          sx={{ flexGrow: 1, height: 6, borderRadius: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {prefilledCount}/{totalQuestions}
                        </Typography>
                      </Box>
                      {notes && (
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', fontStyle: 'italic' }}>
                          Note: {notes}
                        </Typography>
                      )}
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default IndividualByPerson;
