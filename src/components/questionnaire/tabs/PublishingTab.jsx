import { Box, Typography, Paper, Stack } from '@mui/material';
import { Publish as PublishIcon } from '@mui/icons-material';

function PublishingTab({ questionnaire }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Publishing & Distribution
      </Typography>

      <Paper
        sx={{
          p: 8,
          textAlign: 'center',
          backgroundColor: 'background.paper',
          mt: 4,
        }}
      >
        <Stack spacing={2} alignItems="center">
          <PublishIcon sx={{ fontSize: 64, color: 'text.secondary' }} />
          <Typography variant="h6" color="text.secondary">
            Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 500 }}>
            Publishing functionality will allow you to distribute questionnaires
            to participants, manage response collection, and track completion status.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default PublishingTab;
