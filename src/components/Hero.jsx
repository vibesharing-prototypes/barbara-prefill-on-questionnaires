import { Box, Typography, Stack } from '@mui/material';

function Hero() {
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
          Welcome to Our Landing Page
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: 'primary.contrastText',
            textAlign: 'center'
          }}
        >
          Building modern web experiences with Atlas Design System
        </Typography>
      </Stack>
    </Box>
  );
}

export default Hero;
