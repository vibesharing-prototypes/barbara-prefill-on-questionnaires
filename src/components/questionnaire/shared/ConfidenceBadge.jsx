import { Chip } from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

function ConfidenceBadge({ score, showLabel = true }) {
  const percentage = Math.round(score * 100);

  let color, icon, label;

  if (score >= 0.8) {
    color = 'success';
    icon = <CheckCircleIcon />;
    label = 'High';
  } else if (score >= 0.5) {
    color = 'warning';
    icon = <WarningIcon />;
    label = 'Medium';
  } else {
    color = 'error';
    icon = <ErrorIcon />;
    label = 'Low';
  }

  return (
    <Chip
      icon={icon}
      label={showLabel ? `${label} (${percentage}%)` : `${percentage}%`}
      color={color}
      size="small"
      variant="outlined"
    />
  );
}

export default ConfidenceBadge;
