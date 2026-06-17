import { Colors, Radius, Spacing } from "@/constants/theme";
import { categories } from "@/mock/categories";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Categories() {
  const colors = Colors.light;

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((item) => (
        <View key={item.label} style={styles.item}>
          <View
            style={[styles.iconCircle, { backgroundColor: colors.surfaceHigh }]}
          >
            <item.icon color={colors.text} size={18} strokeWidth={1.9} />
          </View>
          <Text
            numberOfLines={1}
            style={[styles.label, { color: colors.textSecondary }]}
          >
            {item.label}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 20,
    paddingRight: Spacing.containerPadding,
    // borderWidth: 2,
    // borderColor: "green",
  },
  item: {
    alignItems: "center",
    width: 56,
  },
  iconCircle: {
    alignItems: "center",
    borderRadius: Radius.full,
    height: 48,
    justifyContent: "center",
    marginBottom: 10,
    width: 48,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: -0.12,
    textAlign: "center",
  },
});
