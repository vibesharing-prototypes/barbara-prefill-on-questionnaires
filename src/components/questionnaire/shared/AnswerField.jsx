import { TextField, Select, MenuItem, FormControl, InputAdornment, Tooltip } from '@mui/material';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import { useQuestionnaire } from '../../../hooks/useQuestionnaire';

function AnswerField({ question, questionnaireId, participantId = 'default' }) {
  const { getAnswer, setAnswer, questionnaire } = useQuestionnaire(questionnaireId);
  const answer = getAnswer(question.id, participantId);
  const value = answer?.value || '';

  // Check if this is coming from default (for non-default participants)
  const isFromDefault = participantId !== 'default' && answer?.participantId === 'default';

  const handleChange = (event) => {
    setAnswer(question.id, event.target.value, participantId, answer?.isPrefilled);
  };

  const commonProps = {
    fullWidth: true,
    size: "small",
    sx: {
      backgroundColor: answer?.isPrefilled ? 'action.hover' : 'background.paper',
      '& .MuiOutlinedInput-root': isFromDefault ? {
        borderColor: 'info.main',
        borderStyle: 'dashed',
        borderWidth: 2,
      } : {}
    }
  };

  const startAdornment = isFromDefault ? (
    <InputAdornment position="start">
      <Tooltip title="Using default value (edit to override)">
        <ContentCopyIcon fontSize="small" color="info" />
      </Tooltip>
    </InputAdornment>
  ) : null;

  switch (question.type) {
    case 'text':
      return (
        <TextField
          {...commonProps}
          value={value}
          onChange={handleChange}
          placeholder={isFromDefault ? "Using default value (edit to override)" : "Enter your answer"}
          InputProps={{ startAdornment }}
        />
      );

    case 'number':
      return (
        <TextField
          {...commonProps}
          type="number"
          value={value}
          onChange={handleChange}
          placeholder={isFromDefault ? "Using default value" : "Enter a number"}
          InputProps={{ startAdornment }}
        />
      );

    case 'date':
      return (
        <TextField
          {...commonProps}
          type="date"
          value={value}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          InputProps={{ startAdornment }}
        />
      );

    case 'dropdown':
      return (
        <FormControl fullWidth size="small">
          <Select
            value={value}
            onChange={handleChange}
            displayEmpty
            sx={{
              ...commonProps.sx,
              '& .MuiSelect-select': isFromDefault ? {
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              } : {}
            }}
            startAdornment={startAdornment}
          >
            <MenuItem value="">
              <em>{isFromDefault ? "Using default value" : "Select an option"}</em>
            </MenuItem>
            {question.options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    case 'multiline':
      return (
        <TextField
          {...commonProps}
          multiline
          rows={4}
          value={value}
          onChange={handleChange}
          placeholder={isFromDefault ? "Using default value (edit to override)" : "Enter your detailed response"}
          InputProps={{ startAdornment }}
        />
      );

    default:
      return (
        <TextField
          {...commonProps}
          value={value}
          onChange={handleChange}
          placeholder={isFromDefault ? "Using default value" : "Enter your answer"}
          InputProps={{ startAdornment }}
        />
      );
  }
}

export default AnswerField;
