import { Box, Typography, Paper, Stack } from '@mui/material';
import { AccountTree as AccountTreeIcon } from '@mui/icons-material';

function LogicTab({ questionnaire }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Logic & Branching
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
          <AccountTreeIcon sx={{ fontSize: 64, color: 'text.secondary' }} />
          <Typography variant="h6" color="text.secondary">
            Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 500 }}>
            Logic and branching functionality will allow you to create conditional
            questions, skip logic, and dynamic questionnaire flows based on user responses.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default LogicTab;
