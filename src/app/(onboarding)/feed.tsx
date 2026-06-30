import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRight, Palette, Scissors, Smile, Luggage, Laptop } from "lucide-react-native";

import { OnboardingDots } from "@/components/onboarding/onboarding-dots";
import { Colors, Radius, Spacing, Typography } from "@/constants/theme";

const CATEGORIES = [
  { label: "Fashion", icon: Scissors },
  { label: "Tech", icon: Laptop },
  { label: "Beauty", icon: Smile },
  { label: "Art & Design", icon: Palette },
  { label: "Travel & Leisure", icon: Luggage },
];

export default function PersonalizedFeed() {
  const colors = Colors.light;
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <View style={styles.topBar}>
          <Text style={[styles.brand, { color: colors.text }]}>ELITE</Text>
          <Pressable onPress={() => router.replace("/(tabs)")}>
            <Text style={[styles.skipText, { color: colors.textSecondary }]}>
              Skip
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { backgroundColor: colors.text }]} />
        </View>

        <Text style={[styles.title, { color: colors.text }]}>
          Tailored for You
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Personalize your feed based on your style and preferences.
        </Text>

        <View style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.label}
              style={[
                styles.categoryCard,
                {
                  borderColor: colors.outlineVariant,
                  backgroundColor: colors.surfaceLowest,
                },
              ]}
            >
              <cat.icon size={22} color={colors.text} />
              <Text style={[styles.categoryLabel, { color: colors.text }]}>
                {cat.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.bottomActions}>
          <Pressable
            onPress={() => router.push("/(onboarding)/preferences")}
            style={[styles.nextButton, { backgroundColor: colors.text }]}
          >
            <Text style={[styles.nextLabel, { color: colors.onPrimary }]}>
              Next
            </Text>
            <ArrowRight size={20} color={colors.onPrimary} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    width: "100%",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.containerPadding,
    paddingTop: Spacing.two,
  },
  brand: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  skipText: {
    ...Typography.bodyMd,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.containerPadding,
    paddingTop: Spacing.five,
    gap: Spacing.three,
  },
  progressBar: {
    width: "100%",
    height: 4,
    borderRadius: 2,
    backgroundColor: "#e4e2e4",
  },
  progressFill: {
    width: "100%",
    height: 4,
    borderRadius: 2,
  },
  title: {
    ...Typography.headlineLg,
    fontSize: 30,
    textAlign: "center",
  },
  subtitle: {
    ...Typography.bodyMd,
    textAlign: "center",
    paddingHorizontal: Spacing.two,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  categoryCard: {
    width: "47%",
    aspectRatio: 1.6,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.four,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.two,
  },
  categoryLabel: {
    ...Typography.bodySm,
    fontWeight: "500",
  },
  bottomActions: {
    marginTop: "auto",
    paddingBottom: Spacing.four,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.two,
    borderRadius: Radius.pill,
    height: 56,
    width: "100%",
  },
  nextLabel: {
    ...Typography.titleMd,
    fontSize: 18,
  },
});
