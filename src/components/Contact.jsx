import { Box, Heading, Text, Stack } from '@atlaskit/primitives';

function Contact() {
  return (
    <Box
      paddingBlock="space.800"
      paddingInline="space.400"
      backgroundColor="color.background.accent.blue.subtlest"
    >
      <Stack space="space.400" alignInline="center">
        <Heading size="large" as="h2">Get in Touch</Heading>

        <Box style={{ maxWidth: '600px', textAlign: 'center' }}>
          <Stack space="space.300">
            <Text>
              Have questions or want to learn more about our project? We'd love to hear from you!
            </Text>

            <Stack space="space.200">
              <Text weight="semibold">Email</Text>
              <Text>contact@example.com</Text>
            </Stack>

            <Stack space="space.200">
              <Text weight="semibold">Phone</Text>
              <Text>+1 (555) 123-4567</Text>
            </Stack>

            <Stack space="space.200">
              <Text weight="semibold">Location</Text>
              <Text>San Francisco, CA</Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default Contact;
