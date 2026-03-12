import { Box, Heading, Text, Stack } from '@atlaskit/primitives';
import { token } from '@atlaskit/tokens';

function Hero() {
  return (
    <Box
      paddingBlock="space.1000"
      paddingInline="space.400"
      backgroundColor="color.background.brand.bold"
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack space="space.300" alignInline="center">
        <Heading size="xlarge" as="h1" style={{ color: token('color.text.inverse') }}>
          Welcome to Our Landing Page
        </Heading>
        <Text size="large" style={{ color: token('color.text.inverse') }}>
          Building modern web experiences with Atlas Design System
        </Text>
      </Stack>
    </Box>
  );
}

export default Hero;
