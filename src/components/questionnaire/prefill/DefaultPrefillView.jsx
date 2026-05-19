import {
  Box,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Chip,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Info as InfoIcon } from '@mui/icons-material';
import QuestionCard from '../shared/QuestionCard';
import { useQuestionnaire } from '../../../hooks/useQuestionnaire';

function DefaultPrefillView({ questionnaire }) {
  const { allQuestions, getAnswer } = useQuestionnaire(questionnaire.id);

  const prefilledCount = allQuestions.filter(
    q => getAnswer(q.id, 'default')?.isPrefilled
  ).length;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Default Prefill Answers
        </Typography>
        <Chip
          label={`${prefilledCount} of ${allQuestions.length} questions prefilled`}
          color="primary"
          variant="outlined"
        />
      </Box>

      <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 3 }}>
        These answers will be applied to all participants by default. When you switch to
        "Individual by Person" or "Individual by Question" layouts, you'll see these values
        in the fields (indicated by dashed borders). Participants can override these values
        for their individual responses.
      </Alert>

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
                {page.questions.map((question) => {
                  const answer = getAnswer(question.id, 'default');
                  return (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      questionnaireId={questionnaire.id}
                      participantId="default"
                      showPrefillIndicator={answer?.isPrefilled}
                    />
                  );
                })}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  );
}

export default DefaultPrefillView;
