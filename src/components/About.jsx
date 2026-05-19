import { Box, Typography, Stack, Grid } from '@mui/material';
import {
  AutoAwesome as AutoAwesomeIcon,
  Compare as CompareIcon,
  ViewCarousel as ViewCarouselIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';

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
          Key Features
        </Typography>

        <Grid container spacing={3} sx={{ maxWidth: '1200px' }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 3, backgroundColor: 'background.paper', borderRadius: 1, height: '100%' }}>
              <Stack spacing={2}>
                <AutoAwesomeIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'semibold' }}>
                  Smart Field Matching
                </Typography>
                <Typography variant="body1">
                  Automatically match fields from previous questionnaires or uploaded files with
                  confidence scoring. Manual override available for fine-tuning.
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 3, backgroundColor: 'background.paper', borderRadius: 1, height: '100%' }}>
              <Stack spacing={2}>
                <CompareIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'semibold' }}>
                  Side-by-Side Comparison
                </Typography>
                <Typography variant="body1">
                  Compare current and previous questionnaires with visual redlining. See what's
                  new, modified, or removed at a glance.
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 3, backgroundColor: 'background.paper', borderRadius: 1, height: '100%' }}>
              <Stack spacing={2}>
                <ViewCarouselIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'semibold' }}>
                  Flexible Layouts
                </Typography>
                <Typography variant="body1">
                  Choose between default (single answer for all), by-person, or by-question views.
                  Navigate efficiently through participants and questions.
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 3, backgroundColor: 'background.paper', borderRadius: 1, height: '100%' }}>
              <Stack spacing={2}>
                <CloudUploadIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'semibold' }}>
                  Multiple Data Sources
                </Typography>
                <Typography variant="body1">
                  Import from previous questionnaires, board systems, CSV/Excel files, or external
                  URLs. Flexible data ingestion for all scenarios.
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
