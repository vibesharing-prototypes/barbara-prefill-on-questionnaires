import { Box, Text, Stack, Grid } from '@atlaskit/primitives';

function About() {
  return (
    <Box
      paddingBlock="space.1000"
      paddingInline="space.400"
      backgroundColor="color.background.neutral"
    >
      <Stack space="space.600" alignInline="center">
        <Box as="h2" style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>About Our Project</Box>

        <Grid templateColumns="1fr 1fr 1fr" gap="space.400" xcss={{ maxWidth: '1200px' }}>
          <Box padding="space.300" backgroundColor="color.background.neutral.subtle">
            <Stack space="space.200">
              <Box as="h3" style={{ fontSize: '1.25rem', fontWeight: 'semibold', margin: 0 }}>Modern Design</Box>
              <Text>
                Built with Atlas Design System, ensuring consistent and accessible user interfaces.
              </Text>
            </Stack>
          </Box>

          <Box padding="space.300" backgroundColor="color.background.neutral.subtle">
            <Stack space="space.200">
              <Box as="h3" style={{ fontSize: '1.25rem', fontWeight: 'semibold', margin: 0 }}>Fast Performance</Box>
              <Text>
                Powered by Vite and React for lightning-fast development and optimal user experience.
              </Text>
            </Stack>
          </Box>

          <Box padding="space.300" backgroundColor="color.background.neutral.subtle">
            <Stack space="space.200">
              <Box as="h3" style={{ fontSize: '1.25rem', fontWeight: 'semibold', margin: 0 }}>Scalable Architecture</Box>
              <Text>
                Component-based structure makes it easy to maintain and extend functionality.
              </Text>
            </Stack>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
}

export default About;
