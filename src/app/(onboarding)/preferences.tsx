import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Preferences = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Preferences</Text>
      <Link href="/(onboarding)">Prev</Link>
      <Link href="/(tabs)">Home</Link>
    </View>
  );
};

export default Preferences;

const styles = StyleSheet.create({});
