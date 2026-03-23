import { Chip, Avatar } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

function ParticipantChip({ participant, selected = false, onClick, ...props }) {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Chip
      avatar={<Avatar>{getInitials(participant.name)}</Avatar>}
      label={participant.name}
      onClick={onClick}
      color={selected ? 'primary' : 'default'}
      variant={selected ? 'filled' : 'outlined'}
      sx={{ cursor: onClick ? 'pointer' : 'default' }}
      {...props}
    />
  );
}

export default ParticipantChip;
