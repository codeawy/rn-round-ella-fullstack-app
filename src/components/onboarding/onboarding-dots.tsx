import { View, StyleSheet } from "react-native";
import { Colors, Radius, Spacing } from "@/constants/theme";

type Props = {
  total: number;
  active: number;
};

export function OnboardingDots({ total, active }: Props) {
  const colors = Colors.light;

  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              backgroundColor:
                i === active ? colors.text : colors.outlineVariant,
              width: i === active ? 24 : 8,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.one,
  },
  dot: {
    height: 8,
    borderRadius: Radius.full,
  },
});
