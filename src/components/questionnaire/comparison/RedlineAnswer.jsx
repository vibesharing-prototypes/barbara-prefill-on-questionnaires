import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Grid,
  Button,
  Alert,
} from '@mui/material';
import {
  TrendingFlat as TrendingFlatIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/icons-material';

function RedlineAnswer({ oldValue, newValue, hasChanged, showLabels = true, onApply, questionId, currentQuestionnaireId, isApplied }) {
  const [applied, setApplied] = useState(isApplied);

  const handleApply = () => {
    if (onApply) {
      onApply(questionId, newValue);
      setApplied(true);
    }
  };
  if (!hasChanged) {
    return (
      <Paper variant="outlined" sx={{ p: 2, backgroundColor: 'background.paper' }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <CheckCircleIcon fontSize="small" color="success" />
          <Chip label="User Accepted Prefill" size="small" color="success" variant="outlined" />
        </Stack>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {newValue || oldValue || <em>No answer</em>}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          ✅ User kept your prefilled value - no changes needed for this year
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        backgroundColor: 'warning.light',
        borderColor: 'warning.main',
        borderWidth: 2,
      }}
    >
      <Stack spacing={2}>
        <Chip label="User Corrected" size="small" color="warning" sx={{ alignSelf: 'flex-start' }} />

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                p: 2,
                backgroundColor: 'background.paper',
                borderRadius: 1,
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                {showLabels ? 'What You Prefilled' : 'Prefilled:'}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: 'error.main',
                  fontStyle: oldValue ? 'normal' : 'italic',
                }}
              >
                {oldValue || 'No answer'}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TrendingFlatIcon color="action" sx={{ fontSize: 40 }} />
          </Grid>

          <Grid item xs={12} md={5}>
            <Box
              sx={{
                p: 2,
                backgroundColor: 'success.light',
                borderRadius: 1,
                border: 2,
                borderColor: 'success.main',
              }}
            >
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                {showLabels ? 'What User Submitted' : 'User Submitted:'}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: 'success.dark',
                  fontStyle: newValue ? 'normal' : 'italic',
                }}
              >
                {newValue || 'No answer'}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {oldValue && newValue && !applied && (
          <Box sx={{ p: 1.5, backgroundColor: 'info.light', borderRadius: 1, border: 1, borderColor: 'info.main' }}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  💡 Action: Update this year's prefill from "{oldValue}" to "{newValue}"
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                  Apply the user's corrected answer to {new Date().getFullYear()} prefill
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleApply}
                size="small"
              >
                Apply to {new Date().getFullYear()}
              </Button>
            </Stack>
          </Box>
        )}

        {applied && (
          <Alert severity="success" icon={<CheckCircleOutlineIcon />}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              ✅ Applied to {new Date().getFullYear()} prefill!
            </Typography>
            <Typography variant="caption">
              This corrected value has been added to the current year's default prefill.
            </Typography>
          </Alert>
        )}
      </Stack>
    </Paper>
  );
}

export default RedlineAnswer;
