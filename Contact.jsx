import { Box, Typography, Stack } from '@mui/material';

function Contact() {
  return (
    <Box
      sx={{
        paddingBlock: 8,
        paddingInline: 3,
        backgroundColor: 'action.hover',
      }}
    >
      <Stack spacing={4} alignItems="center">
        <Typography variant="h2" component="h2" sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Get in Touch
        </Typography>

        <Box sx={{ maxWidth: '600px', textAlign: 'center' }}>
          <Stack spacing={3}>
            <Typography variant="body1">
              Have questions or want to learn more about our project? We'd love to hear from you!
            </Typography>

            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight="semibold">
                Email
              </Typography>
              <Typography variant="body1">
                contact@example.com
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight="semibold">
                Phone
              </Typography>
              <Typography variant="body1">
                +1 (555) 123-4567
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight="semibold">
                Location
              </Typography>
              <Typography variant="body1">
                San Francisco, CA
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default Contact;
