import { Box, Typography, Stack, Button } from '@mui/material';
import { Assignment as AssignmentIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'primary.main',
        paddingBlock: 8,
        paddingInline: 3,
      }}
    >
      <Stack spacing={3} alignItems="center">
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'primary.contrastText',
            textAlign: 'center'
          }}
        >
          Questionnaire Prefill System
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: 'primary.contrastText',
            textAlign: 'center'
          }}
        >
          Intelligent data prefilling with smart field matching and comparison
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AssignmentIcon />}
          onClick={() => navigate('/questionnaire/demo-esg-2025')}
          sx={{
            backgroundColor: 'background.paper',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'grey.100',
            },
          }}
        >
          View Demo Questionnaire
        </Button>
      </Stack>
    </Box>
  );
}

export default Hero;
