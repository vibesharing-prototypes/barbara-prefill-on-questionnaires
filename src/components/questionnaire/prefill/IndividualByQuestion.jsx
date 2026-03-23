import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import {
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useQuestionnaireContext } from '../../../context/QuestionnaireContext';
import { useQuestionnaire } from '../../../hooks/useQuestionnaire';
import ParticipantChip from '../shared/ParticipantChip';
import AnswerField from '../shared/AnswerField';

function IndividualByQuestion({ questionnaire }) {
  const { participants } = useQuestionnaireContext();
  const { getAnswer } = useQuestionnaire(questionnaire.id);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const allQuestions = questionnaire.pages.flatMap(page => page.questions);

  useEffect(() => {
    if (allQuestions.length > 0 && !selectedQuestion) {
      setSelectedQuestion(allQuestions[0]);
      setCurrentIndex(0);
    }
  }, [allQuestions, selectedQuestion]);

  const handleQuestionChange = (event) => {
    const questionId = event.target.value;
    const question = allQuestions.find(q => q.id === questionId);
    const index = allQuestions.findIndex(q => q.id === questionId);
    setSelectedQuestion(question);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedQuestion(allQuestions[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex < allQuestions.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedQuestion(allQuestions[newIndex]);
    }
  };

  if (!selectedQuestion) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography>No questions available</Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel>Select Question</InputLabel>
            <Select
              value={selectedQuestion.id}
              onChange={handleQuestionChange}
              label="Select Question"
            >
              {allQuestions.map((question, index) => (
                <MenuItem key={question.id} value={question.id}>
                  Q{index + 1}: {question.text.length > 80 ? question.text.substring(0, 80) + '...' : question.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            startIcon={<NavigateBeforeIcon />}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous Question
          </Button>
          <Typography variant="body2" color="text.secondary">
            {currentIndex + 1} of {allQuestions.length}
          </Typography>
          <Button
            endIcon={<NavigateNextIcon />}
            onClick={handleNext}
            disabled={currentIndex === allQuestions.length - 1}
          >
            Next Question
          </Button>
        </Stack>
      </Paper>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h6" sx={{ flex: 1 }}>
              {selectedQuestion.text}
              {selectedQuestion.required && (
                <Typography component="span" color="error" sx={{ ml: 0.5 }}>
                  *
                </Typography>
              )}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip label={selectedQuestion.type} size="small" variant="outlined" />
              {selectedQuestion.required && (
                <Chip label="Required" size="small" color="error" variant="outlined" />
              )}
            </Stack>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="text.secondary">
            View and edit answers from all participants for this question
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Participant Answers
      </Typography>

      {selectedQuestion && (() => {
        const usingDefaultCount = participants.filter(p => {
          const answer = getAnswer(selectedQuestion.id, p.id);
          return answer?.participantId === 'default';
        }).length;

        return usingDefaultCount > 0 ? (
          <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 3 }}>
            {usingDefaultCount} participant{usingDefaultCount > 1 ? 's are' : ' is'} using the default value for this question.
            Fields with a dashed border and 📋 icon are showing default values.
          </Alert>
        ) : null;
      })()}

      <Grid container spacing={2}>
        {participants.map((participant) => (
          <Grid item xs={12} md={6} key={participant.id}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <ParticipantChip participant={participant} />
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                    {participant.email}
                  </Typography>
                </Box>
                <AnswerField
                  question={selectedQuestion}
                  questionnaireId={questionnaire.id}
                  participantId={participant.id}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default IndividualByQuestion;
