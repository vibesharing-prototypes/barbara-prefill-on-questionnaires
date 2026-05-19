import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

function RedlineQuestion({ question, changeType, side }) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'new':
        return {
          bg: 'success.light',
          border: 'success.main',
          icon: <AddIcon />,
          label: 'New',
          color: 'success',
        };
      case 'removed':
        return {
          bg: 'error.light',
          border: 'error.main',
          icon: <RemoveIcon />,
          label: 'Removed',
          color: 'error',
        };
      case 'modified':
        return {
          bg: 'warning.light',
          border: 'warning.main',
          icon: <EditIcon />,
          label: side === 'current' ? 'Current' : 'Previous',
          color: 'warning',
        };
      default:
        return {
          bg: 'background.paper',
          border: 'divider',
          icon: <CheckCircleIcon />,
          label: 'Unchanged',
          color: 'default',
        };
    }
  };

  const changeStyle = getChangeColor();

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: changeStyle.border,
        borderWidth: changeType !== 'unchanged' ? 2 : 1,
        backgroundColor: changeType !== 'unchanged' ? changeStyle.bg : 'background.paper',
        opacity: changeType === 'removed' ? 0.7 : 1,
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: changeType !== 'unchanged' ? 600 : 400,
                flex: 1,
                textDecoration: changeType === 'removed' ? 'line-through' : 'none',
              }}
            >
              {question.text}
              {question.required && (
                <Typography component="span" color="error" sx={{ ml: 0.5 }}>
                  *
                </Typography>
              )}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                icon={changeStyle.icon}
                label={changeStyle.label}
                size="small"
                color={changeStyle.color}
                variant={changeType === 'unchanged' ? 'outlined' : 'filled'}
              />
              <Chip
                label={question.type}
                size="small"
                variant="outlined"
              />
            </Stack>
          </Box>

          {question.options && question.options.length > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                Options:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {question.options.map((option, index) => (
                  <Chip
                    key={index}
                    label={option}
                    size="small"
                    variant="outlined"
                    sx={{ opacity: changeType === 'removed' ? 0.5 : 1 }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {changeType === 'modified' && (
            <Box
              sx={{
                p: 1,
                backgroundColor: 'background.paper',
                borderRadius: 1,
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {side === 'current' ? 'Updated version' : 'Original version'}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default RedlineQuestion;
