import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Button,
  Stack,
  Alert,
  IconButton,
  Tooltip,
  Chip,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Clear as ClearIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useSmartMatcher } from '../../../hooks/useSmartMatcher';
import { usePrefillSource } from '../../../hooks/usePrefillSource';
import { useQuestionnaireContext } from '../../../context/QuestionnaireContext';
import ConfidenceBadge from '../shared/ConfidenceBadge';

function SmartMatcher({ questionnaire, onComplete }) {
  const { applyPrefillMappings, activePrefillSource } = useQuestionnaireContext();
  const { getSourceFields } = usePrefillSource();
  const sourceFields = getSourceFields();

  // Determine if source is a questionnaire or a file/other
  const isQuestionnaireSource = activePrefillSource?.type === 'previous_questionnaire';
  const sourceLabel = isQuestionnaireSource ? 'Source Question' : 'Source Field';
  const targetLabel = 'Target Question';

  const allQuestions = questionnaire.pages.flatMap(page => page.questions);

  const {
    fieldMappings,
    autoMatch,
    manualOverride,
    removeMapping,
    clearAllMappings,
    getMapping,
    statistics,
    autoMatchCompleted,
  } = useSmartMatcher(allQuestions, sourceFields);

  const handleApplyMappings = () => {
    applyPrefillMappings(questionnaire.id);
    onComplete();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Smart Field Matching
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        We've automatically matched source fields to questions based on similarity.
        Review and adjust the mappings below.
      </Typography>

      {/* Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4" color="primary">
                {statistics.matched}/{statistics.total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fields Matched
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4" color="success.main">
                {statistics.avgConfidence}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg. Confidence
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4" sx={{ color: 'success.main' }}>
                {statistics.highConfidence}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                High
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4" sx={{ color: 'warning.main' }}>
                {statistics.mediumConfidence}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Medium
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4" sx={{ color: 'error.main' }}>
                {statistics.lowConfidence}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Low
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Actions */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={autoMatch}
          disabled={!sourceFields.length}
        >
          Re-run Auto Match
        </Button>
        <Button
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={clearAllMappings}
          disabled={fieldMappings.length === 0}
        >
          Clear All
        </Button>
        <Box sx={{ flex: 1 }} />
        <Button
          variant="outlined"
          onClick={onComplete}
          color="secondary"
        >
          Skip Matching Step
        </Button>
      </Stack>

      {autoMatchCompleted && fieldMappings.length === 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          No automatic matches found. Please manually map the fields below.
        </Alert>
      )}

      {/* Mapping Table */}
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="35%">{sourceLabel}</TableCell>
              <TableCell width="40%">{targetLabel}</TableCell>
              <TableCell width="15%">Confidence</TableCell>
              <TableCell width="10%" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sourceFields.map((field) => {
              const mapping = getMapping(field.label || field.key);
              const targetQuestion = mapping
                ? allQuestions.find(q => q.id === mapping.targetQuestionId)
                : null;

              return (
                <TableRow key={field.key}>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {field.label || field.key}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Value: {field.value}
                      </Typography>
                      {mapping?.isManualOverride && (
                        <Chip
                          label="Manual"
                          size="small"
                          color="primary"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Select
                      fullWidth
                      size="small"
                      value={mapping?.targetQuestionId || ''}
                      onChange={(e) => manualOverride(field.label || field.key, e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select a question</em>
                      </MenuItem>
                      {allQuestions.map((q) => (
                        <MenuItem key={q.id} value={q.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" noWrap>
                              {q.text.length > 60 ? q.text.substring(0, 60) + '...' : q.text}
                            </Typography>
                            <Chip label={q.type} size="small" variant="outlined" />
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    {mapping && (
                      <ConfidenceBadge score={mapping.confidenceScore} />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {mapping && (
                      <Tooltip title="Remove mapping">
                        <IconButton
                          size="small"
                          onClick={() => removeMapping(field.label || field.key)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {fieldMappings.length > 0 && (
        <Alert
          severity="success"
          icon={<CheckCircleIcon />}
          sx={{ mt: 3 }}
          action={
            <Button color="inherit" size="small" onClick={handleApplyMappings}>
              Next: Configure Prefill
            </Button>
          }
        >
          <Typography variant="body2">
            <strong>{fieldMappings.length} fields mapped</strong> and ready to apply
          </Typography>
        </Alert>
      )}
    </Box>
  );
}

export default SmartMatcher;
