import { Box, Typography, Stack, Grid } from '@mui/material';

function About() {
  return (
    <Box
      sx={{
        paddingBlock: 10,
        paddingInline: 3,
        backgroundColor: 'background.default',
      }}
    >
      <Stack spacing={6} alignItems="center">
        <Typography variant="h2" component="h2" sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          About Our Project
        </Typography>

        <Grid container spacing={3} sx={{ maxWidth: '1200px' }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ padding: 3, backgroundColor: 'background.paper', borderRadius: 1 }}>
              <Stack spacing={2}>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'semibold' }}>
                  Modern Design
                </Typography>
                <Typography variant="body1">
                  Built with Atlas Design System, ensuring consistent and accessible user interfaces.
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ padding: 3, backgroundColor: 'background.paper', borderRadius: 1 }}>
              <Stack spacing={2}>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'semibold' }}>
                  Fast Performance
                </Typography>
                <Typography variant="body1">
                  Powered by Vite and React for lightning-fast development and optimal user experience.
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ padding: 3, backgroundColor: 'background.paper', borderRadius: 1 }}>
              <Stack spacing={2}>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'semibold' }}>
                  Scalable Architecture
                </Typography>
                <Typography variant="body1">
                  Component-based structure makes it easy to maintain and extend functionality.
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default About;
