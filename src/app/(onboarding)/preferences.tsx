import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRight, X } from "lucide-react-native";
import Svg, { Path } from "react-native-svg";

import { OnboardingDots } from "@/components/onboarding/onboarding-dots";
import { Colors, Radius, Spacing, Typography } from "@/constants/theme";

const DiamondIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 3h12l4 6-10 13L2 9l4-6z"
      fill="none"
      stroke="#ffffff"
      strokeWidth={1.5}
      opacity={0.8}
    />
    <Path
      d="M2 9h20M6 3l-4 6 10 13L22 9l-4-6"
      fill="none"
      stroke="#ffffff"
      strokeWidth={1.5}
      opacity={0.8}
    />
  </Svg>
);

const DotPattern = () => (
  <Svg
    style={StyleSheet.absoluteFill}
    width="100%"
    height="100%"
    opacity={0.08}
  >
    {Array.from({ length: 12 }).map((_, row) =>
      Array.from({ length: 8 }).map((_, col) => (
        <Path
          key={`${row}-${col}`}
          d={`M${12 + col * 28} ${12 + row * 28} m-1.5, 0 a1.5,1.5 0 1,0 3,0 a1.5,1.5 0 1,0 -3,0`}
          fill="#ffffff"
        />
      ))
    )}
  </Svg>
);

export default function MembershipBenefits() {
  const colors = Colors.light;
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <View style={styles.topBar}>
          <Pressable
            onPress={() => router.back()}
            style={styles.closeButton}
            hitSlop={12}
          >
            <X size={22} color={colors.text} />
          </Pressable>
          <Text style={[styles.brand, { color: colors.text }]}>ELITE</Text>
          <View style={styles.closeButton} />
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <DotPattern />
            <View style={styles.cardHeader}>
              <Text style={styles.cardBrand}>ELITE</Text>
              <DiamondIcon />
            </View>
            <View style={styles.cardBottom}>
              <Text style={styles.cardLabel}>MEMBERSHIP STATUS</Text>
              <Text style={styles.cardStatus}>Founding Member</Text>
            </View>
          </View>
        </View>

        <OnboardingDots total={3} active={1} />

        <Text style={[styles.title, { color: colors.text }]}>
          Join the Elite
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Unlock exclusive rewards, early access to drops, and seamless shopping
          experiences crafted for our most valued members.
        </Text>

        <View style={styles.bottomActions}>
          <Pressable
            onPress={() => router.replace("/(tabs)")}
            style={[styles.primaryButton, { backgroundColor: colors.secondary }]}
          >
            <Text style={[styles.primaryLabel, { color: colors.onSecondary }]}>
              Get Started
            </Text>
            <ArrowRight size={20} color={colors.onSecondary} />
          </Pressable>

          <Pressable
            onPress={() => router.replace("/(tabs)")}
            style={styles.loginLink}
          >
            <Text style={[styles.loginText, { color: colors.textSecondary }]}>
              Already have an account?{" "}
              <Text style={{ color: colors.text, fontWeight: "600" }}>
                Log in
              </Text>
            </Text>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.containerPadding,
    paddingTop: Spacing.two,
  },
  brand: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.containerPadding,
    alignItems: "center",
    paddingTop: Spacing.six,
  },
  cardWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: Spacing.six,
  },
  card: {
    width: "90%",
    aspectRatio: 1.5,
    backgroundColor: "#1b1b1d",
    borderRadius: Radius.xl,
    padding: Spacing.five,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardBrand: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2,
  },
  cardBottom: {
    marginTop: "auto",
  },
  cardLabel: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 1.5,
    opacity: 0.6,
  },
  cardStatus: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "600",
    marginTop: Spacing.one,
  },
  title: {
    ...Typography.headlineLg,
    fontSize: 30,
    textAlign: "center",
    marginBottom: Spacing.one,
  },
  subtitle: {
    ...Typography.bodyMd,
    textAlign: "center",
    paddingHorizontal: Spacing.two,
    lineHeight: 22,
  },
  bottomActions: {
    marginTop: "auto",
    width: "100%",
    alignItems: "center",
    paddingBottom: Spacing.four,
    gap: Spacing.three,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.two,
    borderRadius: Radius.pill,
    height: 56,
    width: "100%",
  },
  primaryLabel: {
    ...Typography.titleMd,
    fontSize: 18,
  },
  loginLink: {
    paddingVertical: Spacing.one,
  },
  loginText: {
    ...Typography.bodySm,
    fontSize: 13,
  },
});
