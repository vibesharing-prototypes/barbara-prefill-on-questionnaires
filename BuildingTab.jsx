import { Box, Typography, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import QuestionCard from '../shared/QuestionCard';

function BuildingTab({ questionnaire }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Questionnaire Structure
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This is a simplified view of your questionnaire structure for demonstration purposes.
      </Typography>

      <Stack spacing={2}>
        {questionnaire.pages.map((page) => (
          <Accordion key={page.id} defaultExpanded={page.order === 1}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                Page {page.order}: {page.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                {page.questions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    questionnaireId={questionnaire.id}
                    readonly
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

export default BuildingTab;
