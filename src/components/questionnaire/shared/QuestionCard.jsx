import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import AnswerField from './AnswerField';

function QuestionCard({ question, questionnaireId, participantId = 'default', readonly = false, showPrefillIndicator = false }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 500, flex: 1 }}>
            {question.text}
            {question.required && (
              <Typography component="span" color="error" sx={{ ml: 0.5 }}>
                *
              </Typography>
            )}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip label={question.type} size="small" variant="outlined" />
            {showPrefillIndicator && (
              <Chip label="Prefilled" size="small" color="primary" variant="outlined" />
            )}
          </Box>
        </Box>

        {!readonly && (
          <AnswerField
            question={question}
            questionnaireId={questionnaireId}
            participantId={participantId}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default QuestionCard;
