import { Box, Heading, Text, Stack, Grid } from '@atlaskit/primitives';

function About() {
  return (
    <Box
      paddingBlock="space.1000"
      paddingInline="space.400"
      backgroundColor="color.background.neutral"
    >
      <Stack space="space.600" alignInline="center">
        <Heading size="large" as="h2">About Our Project</Heading>

        <Grid templateColumns="1fr 1fr 1fr" gap="space.400" xcss={{ maxWidth: '1200px' }}>
          <Box padding="space.300" backgroundColor="color.background.neutral.subtle">
            <Stack space="space.200">
              <Heading size="small" as="h3">Modern Design</Heading>
              <Text>
                Built with Atlas Design System, ensuring consistent and accessible user interfaces.
              </Text>
            </Stack>
          </Box>

          <Box padding="space.300" backgroundColor="color.background.neutral.subtle">
            <Stack space="space.200">
              <Heading size="small" as="h3">Fast Performance</Heading>
              <Text>
                Powered by Vite and React for lightning-fast development and optimal user experience.
              </Text>
            </Stack>
          </Box>

          <Box padding="space.300" backgroundColor="color.background.neutral.subtle">
            <Stack space="space.200">
              <Heading size="small" as="h3">Scalable Architecture</Heading>
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
