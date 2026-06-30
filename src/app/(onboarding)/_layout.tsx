import { Stack } from "expo-router";

const OnboardingLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="preferences" />
      <Stack.Screen name="feed" />
    </Stack>
  );
};

export default OnboardingLayout;
