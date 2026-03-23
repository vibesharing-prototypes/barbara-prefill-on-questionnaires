import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Grid,
  Button,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Alert,
  Divider,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  FilterList as FilterListIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useQuestionnaireContext } from '../../../context/QuestionnaireContext';
import { useComparison } from '../../../hooks/useComparison';
import RedlineQuestion from './RedlineQuestion';
import RedlineAnswer from './RedlineAnswer';

function QuestionnaireCompare() {
  const { id, compareId } = useParams();
  const navigate = useNavigate();
  const { getQuestionnaire, updateQuestionnaire, participants } = useQuestionnaireContext();
  const [viewMode, setViewMode] = useState('answers'); // 'survey' | 'answers'
  const [selectedParticipant, setSelectedParticipant] = useState('default');
  const [appliedAnswers, setAppliedAnswers] = useState(new Set());
  const [appliedCount, setAppliedCount] = useState(0);

  const currentQuestionnaire = getQuestionnaire(id);
  const previousQuestionnaire = getQuestionnaire(compareId);

  const {
    comparisonData,
    statistics,
  } = useComparison(currentQuestionnaire, previousQuestionnaire);

  if (!currentQuestionnaire || !previousQuestionnaire) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Questionnaire not found</Typography>
      </Container>
    );
  }

  const handleBack = () => {
    navigate(`/questionnaire/${id}`);
  };

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const handleParticipantChange = (event) => {
    setSelectedParticipant(event.target.value);
  };

  const handleApplyAnswer = (questionId, correctedValue) => {
    // Add the corrected answer to current questionnaire's default answers
    const existingAnswers = currentQuestionnaire.answers || [];
    const existingIndex = existingAnswers.findIndex(
      a => a.questionId === questionId && a.participantId === 'default'
    );

    const newAnswer = {
      questionId,
      participantId: 'default',
      value: correctedValue,
      isPrefilled: true,
      confidenceScore: 1.0, // High confidence since it's user-corrected
    };

    let updatedAnswers;
    if (existingIndex >= 0) {
      // Update existing answer
      updatedAnswers = [...existingAnswers];
      updatedAnswers[existingIndex] = newAnswer;
    } else {
      // Add new answer
      updatedAnswers = [...existingAnswers, newAnswer];
    }

    // Update the questionnaire
    updateQuestionnaire(id, { answers: updatedAnswers });

    // Track applied answers
    setAppliedAnswers(prev => new Set([...prev, questionId]));
    setAppliedCount(prev => prev + 1);
  };

  const handleApplyAll = () => {
    let count = 0;
    allQuestions.forEach((currentQuestion) => {
      const previousQuestion = comparisonData?.unchangedQuestions.find(
        q => q.text.toLowerCase() === currentQuestion.text.toLowerCase()
      ) || comparisonData?.modifiedQuestions.find(
        m => m.current.id === currentQuestion.id
      )?.previous;

      if (!previousQuestion) return;

      const currentAnswer = currentQuestionnaire.answers.find(
        a => a.questionId === currentQuestion.id && a.participantId === 'default'
      );
      const previousAnswer = previousQuestionnaire.answers.find(
        a => a.questionId === previousQuestion.id && a.participantId === 'default'
      );

      const hasChanged = String(currentAnswer?.value || '') !== String(previousAnswer?.value || '');

      // Only apply if changed and not already applied
      if (hasChanged && previousAnswer?.value && !appliedAnswers.has(currentQuestion.id)) {
        handleApplyAnswer(currentQuestion.id, previousAnswer.value);
        count++;
      }
    });
  };

  const allQuestions = currentQuestionnaire.pages.flatMap(page => page.questions);
  const previousQuestions = previousQuestionnaire.pages.flatMap(page => page.questions);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleBack}
            sx={{ mr: 2 }}
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              Review User Corrections
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Compare your prefilled values vs what users actually submitted in {previousQuestionnaire.version}
            </Typography>
          </Box>
          <Chip
            label="New Tab"
            size="small"
            color="primary"
            variant="outlined"
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Use Case Banner */}
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            📋 Workflow: Improve Your Prefill Data
          </Typography>
          <Typography variant="body2">
            <strong>Last year:</strong> You prefilled answers → Users reviewed and corrected them<br />
            <strong>This year:</strong> Review those corrections → Use accurate data for {currentQuestionnaire.version} prefill
          </Typography>
        </Alert>

        {/* Statistics */}
        {viewMode === 'survey' && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Survey Structure Changes
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Chip
                label={`${statistics.totalNew} New`}
                color="success"
                variant="outlined"
              />
              <Chip
                label={`${statistics.totalModified} Modified`}
                color="warning"
                variant="outlined"
              />
              <Chip
                label={`${statistics.totalRemoved} Removed`}
                color="error"
                variant="outlined"
              />
              <Chip
                label={`${statistics.totalUnchanged} Unchanged`}
                variant="outlined"
              />
            </Stack>
          </Paper>
        )}

        {/* View Mode Toggle */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
            <FilterListIcon color="action" />
            <Typography variant="body2">Show:</Typography>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              size="small"
            >
              <ToggleButton value="survey">
                Changes in Survey
              </ToggleButton>
              <ToggleButton value="answers">
                Changes in Answers
              </ToggleButton>
            </ToggleButtonGroup>
            {viewMode === 'answers' && (
              <Chip
                label="Focus on what needs updating"
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Stack>
        </Paper>

        {/* Comparison View */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, mb: 2, backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
              <Typography variant="h6">
                {currentQuestionnaire.title}
              </Typography>
              <Typography variant="body2">
                Version: {currentQuestionnaire.version}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, mb: 2, backgroundColor: 'grey.700', color: 'common.white' }}>
              <Typography variant="h6">
                {previousQuestionnaire.title}
              </Typography>
              <Typography variant="body2">
                Version: {previousQuestionnaire.version}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Survey Changes View */}
        {viewMode === 'survey' && (
          <>
            {/* New Questions */}
            {comparisonData?.newQuestions && comparisonData.newQuestions.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Alert severity="success" sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {comparisonData.newQuestions.length} New Question{comparisonData.newQuestions.length > 1 ? 's' : ''}
                  </Typography>
                </Alert>
                <Stack spacing={2}>
                  {comparisonData.newQuestions.map((question) => (
                    <RedlineQuestion
                      key={question.id}
                      question={question}
                      changeType="new"
                      side="current"
                    />
                  ))}
                </Stack>
              </Box>
            )}

            {/* Modified Questions */}
            {comparisonData?.modifiedQuestions && comparisonData.modifiedQuestions.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {comparisonData.modifiedQuestions.length} Modified Question{comparisonData.modifiedQuestions.length > 1 ? 's' : ''}
                  </Typography>
                </Alert>
                <Stack spacing={2}>
                  {comparisonData.modifiedQuestions.map((modified) => (
                    <Grid container spacing={2} key={modified.current.id}>
                      <Grid item xs={12} md={6}>
                        <RedlineQuestion
                          question={modified.current}
                          changeType="modified"
                          side="current"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <RedlineQuestion
                          question={modified.previous}
                          changeType="modified"
                          side="previous"
                        />
                      </Grid>
                    </Grid>
                  ))}
                </Stack>
              </Box>
            )}

            {/* Removed Questions */}
            {comparisonData?.removedQuestions && comparisonData.removedQuestions.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {comparisonData.removedQuestions.length} Removed Question{comparisonData.removedQuestions.length > 1 ? 's' : ''}
                  </Typography>
                </Alert>
                <Stack spacing={2}>
                  {comparisonData.removedQuestions.map((question) => (
                    <RedlineQuestion
                      key={question.id}
                      question={question}
                      changeType="removed"
                      side="previous"
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </>
        )}

        {/* Answer Changes View */}
        {viewMode === 'answers' && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Answer Changes - What Users Modified
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Review what you prefilled vs what each user actually submitted.
              Use these corrections to improve this year's prefill data.
            </Typography>

            {/* Participant Selector */}
            <Paper sx={{ p: 2, mb: 3, backgroundColor: 'background.default' }}>
              <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  View changes for:
                </Typography>
                <FormControl size="small" sx={{ minWidth: 250 }}>
                  <Select
                    value={selectedParticipant}
                    onChange={handleParticipantChange}
                    displayEmpty
                  >
                    <MenuItem value="default">
                      All Users (Default Prefill)
                    </MenuItem>
                    <Divider />
                    {participants.map((participant) => (
                      <MenuItem key={participant.id} value={participant.id}>
                        {participant.name} - {participant.role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {selectedParticipant !== 'default' && (
                  <Chip
                    label="Individual User View"
                    size="small"
                    color="info"
                    variant="outlined"
                  />
                )}
              </Stack>
            </Paper>

            {appliedCount > 0 && selectedParticipant === 'default' && (
              <Alert severity="success" sx={{ mb: 3 }} icon={<CheckCircleIcon />}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  🎉 {appliedCount} correction{appliedCount > 1 ? 's' : ''} applied to {currentQuestionnaire.version}!
                </Typography>
                <Typography variant="body2">
                  The corrected values have been added to your default prefill. Switch back to the main tab
                  to see them in the Prefill configuration.
                </Typography>
              </Alert>
            )}

            {appliedCount === 0 && selectedParticipant === 'default' && (
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  💡 Use Case: Last year you prefilled answers for users, but they made corrections.
                  Click "Apply to {new Date().getFullYear()}" on any correction to use it for this year's prefill.
                </Typography>
              </Alert>
            )}

            {selectedParticipant !== 'default' && (() => {
              const participant = participants.find(p => p.id === selectedParticipant);
              return (
                <Alert severity="info" sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    👤 Viewing changes made by {participant?.name}
                  </Typography>
                  <Typography variant="caption">
                    See what this specific user changed from your prefilled values.
                  </Typography>
                </Alert>
              );
            })()}

          {/* Answer Statistics */}
          <Paper sx={{ p: 3, mb: 3, backgroundColor: 'info.light' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  User Corrections Summary
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  How many users accepted your prefilled values vs. made their own corrections
                </Typography>
              </Box>
              {appliedCount > 0 && (
                <Chip
                  label={`${appliedCount} Applied to ${new Date().getFullYear()}`}
                  color="success"
                  icon={<CheckCircleIcon />}
                />
              )}
            </Stack>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              {(() => {
                let changedCount = 0;
                let unchangedCount = 0;
                let totalAnswers = 0;

                allQuestions.forEach((currentQuestion) => {
                  const previousQuestion = comparisonData?.unchangedQuestions.find(
                    q => q.text.toLowerCase() === currentQuestion.text.toLowerCase()
                  ) || comparisonData?.modifiedQuestions.find(
                    m => m.current.id === currentQuestion.id
                  )?.previous;

                  if (previousQuestion) {
                    const currentAnswer = currentQuestionnaire.answers.find(
                      a => a.questionId === currentQuestion.id && a.participantId === 'default'
                    );
                    const previousAnswer = previousQuestionnaire.answers.find(
                      a => a.questionId === previousQuestion.id && a.participantId === 'default'
                    );

                    if (currentAnswer?.value || previousAnswer?.value) {
                      totalAnswers++;
                      if (String(currentAnswer?.value || '') !== String(previousAnswer?.value || '')) {
                        changedCount++;
                      } else {
                        unchangedCount++;
                      }
                    }
                  }
                });

                return (
                  <>
                    <Chip
                      label={`${totalAnswers} Total Answers`}
                      color="info"
                      variant="outlined"
                    />
                    <Chip
                      label={`${changedCount} User Corrected`}
                      color="warning"
                      variant="filled"
                      icon={<EditIcon />}
                    />
                    <Chip
                      label={`${unchangedCount} Accepted Prefill`}
                      color="success"
                      variant="outlined"
                      icon={<CheckCircleIcon />}
                    />
                    <Chip
                      label={`${Math.round((changedCount / totalAnswers) * 100) || 0}% Correction Rate`}
                      color="primary"
                      variant="outlined"
                    />
                  </>
                );
              })()}
            </Stack>
          </Paper>

            {/* Bulk Apply Button - Only for default participant */}
            {selectedParticipant === 'default' && (() => {
              const changedAnswersCount = allQuestions.filter((currentQuestion) => {
                const previousQuestion = comparisonData?.unchangedQuestions.find(
                  q => q.text.toLowerCase() === currentQuestion.text.toLowerCase()
                ) || comparisonData?.modifiedQuestions.find(
                  m => m.current.id === currentQuestion.id
                )?.previous;

                if (!previousQuestion) return false;

                const currentAnswer = currentQuestionnaire.answers.find(
                  a => a.questionId === currentQuestion.id && a.participantId === 'default'
                );
                const previousAnswer = previousQuestionnaire.answers.find(
                  a => a.questionId === previousQuestion.id && a.participantId === 'default'
                );

                return previousAnswer?.value && String(currentAnswer?.value || '') !== String(previousAnswer?.value || '');
              }).length;

              const unappliedCount = changedAnswersCount - appliedCount;

              return unappliedCount > 0 ? (
                <Paper sx={{ p: 2, mb: 3, backgroundColor: 'primary.light' }}>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Quick Action: Apply All User Corrections
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Update all {unappliedCount} corrected answer{unappliedCount > 1 ? 's' : ''} to {new Date().getFullYear()} prefill at once
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={handleApplyAll}
                      size="large"
                    >
                      Apply All ({unappliedCount})
                    </Button>
                  </Stack>
                </Paper>
              ) : null;
            })()}

            <Stack spacing={3}>
              {allQuestions.map((currentQuestion) => {
                const previousQuestion = comparisonData?.unchangedQuestions.find(
                  q => q.text.toLowerCase() === currentQuestion.text.toLowerCase()
                ) || comparisonData?.modifiedQuestions.find(
                  m => m.current.id === currentQuestion.id
                )?.previous;

                if (!previousQuestion) return null;

                // Get answers based on selected participant
                const currentAnswer = currentQuestionnaire.answers.find(
                  a => a.questionId === currentQuestion.id && a.participantId === selectedParticipant
                );
                const previousAnswer = previousQuestionnaire.answers.find(
                  a => a.questionId === previousQuestion.id && a.participantId === selectedParticipant
                );

                const currentValue = currentAnswer?.value;
                const previousValue = previousAnswer?.value;
                const hasChanged = String(currentValue || '') !== String(previousValue || '');

                // Only show if we have at least one answer OR if there's a change
                if (!currentValue && !previousValue) return null;

                // For individual participants, only show if there's a change
                if (selectedParticipant !== 'default' && !hasChanged) return null;

                return (
                  <Card key={currentQuestion.id} variant="outlined">
                    <CardContent>
                      <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                        {currentQuestion.text}
                      </Typography>
                      <RedlineAnswer
                        oldValue={previousValue}
                        newValue={currentValue}
                        hasChanged={hasChanged}
                        onApply={selectedParticipant === 'default' ? handleApplyAnswer : undefined}
                        questionId={currentQuestion.id}
                        currentQuestionnaireId={id}
                        isApplied={appliedAnswers.has(currentQuestion.id)}
                      />
                    </CardContent>
                  </Card>
                );
              })}
              {selectedParticipant !== 'default' && allQuestions.every((currentQuestion) => {
                const previousQuestion = comparisonData?.unchangedQuestions.find(
                  q => q.text.toLowerCase() === currentQuestion.text.toLowerCase()
                ) || comparisonData?.modifiedQuestions.find(
                  m => m.current.id === currentQuestion.id
                )?.previous;

                if (!previousQuestion) return true;

                const currentAnswer = currentQuestionnaire.answers.find(
                  a => a.questionId === currentQuestion.id && a.participantId === selectedParticipant
                );
                const previousAnswer = previousQuestionnaire.answers.find(
                  a => a.questionId === previousQuestion.id && a.participantId === selectedParticipant
                );

                return String(currentAnswer?.value || '') === String(previousAnswer?.value || '');
              }) && (
                <Alert severity="info">
                  <Typography variant="body2">
                    This user didn't make any changes to the prefilled answers.
                  </Typography>
                </Alert>
              )}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default QuestionnaireCompare;
