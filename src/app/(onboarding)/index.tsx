import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const OnboardingFirst = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>OnboardingFirst</Text>
      <Link href="/(onboarding)/preferences">Next</Link>
    </View>
  );
};

export default OnboardingFirst;

const styles = StyleSheet.create({});
