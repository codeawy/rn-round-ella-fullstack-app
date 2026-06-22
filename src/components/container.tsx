import { Colors, Spacing } from "@/constants/theme";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = Colors.light;

export default function Container({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // borderColor: colors.secondary,
    // borderWidth: 1,
    maxWidth: 430,
    paddingHorizontal: Spacing.containerPadding,
    width: "100%",
  },
});

// * Reusability, Flexibility
