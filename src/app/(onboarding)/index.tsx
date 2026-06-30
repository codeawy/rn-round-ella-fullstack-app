import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRight } from "lucide-react-native";

import { OnboardingDots } from "@/components/onboarding/onboarding-dots";
import { Colors, Radius, Spacing, Typography } from "@/constants/theme";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCcDC3f6HgU8-yk8awmMK99B2L1o6CblBz8cF9kNgPCXfy-JiSeaW-eQTzzft6mO-ciO3QeiTYzlsSVuqorQl1qjULivsGIHP4eryRklxRfmjqb79ZBC1MxrNCw1nXpr79Npf2W_wyD41bOzxWhjIBHibzvXxb5iztZzlJp1KRKSpTCm9GPMyPj8LV2pMiXMBJFkngKZvrTkH_46xKKHR65VpvAqw_52NCqOhYCLOdsTB5yOnN9ilEHpqKnYSaAZSqT3HfrAF3iWWl7";

export default function OnboardingFirst() {
  const colors = Colors.light;
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={{ uri: HERO_IMAGE }}
        style={styles.heroImage}
        contentFit="cover"
        transition={300}
      />

      <SafeAreaView edges={["bottom"]} style={styles.bottomArea}>
        <View style={[styles.content, { backgroundColor: colors.background }]}>
          <OnboardingDots total={3} active={0} />

          <Text style={[styles.title, { color: colors.text }]}>
            Curated Excellence
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Discover a handpicked selection of premium footwear and accessories.
          </Text>

          <Pressable
            onPress={() => router.push("/(onboarding)/feed")}
            style={[styles.nextButton, { backgroundColor: colors.text }]}
          >
            <Text style={[styles.nextLabel, { color: colors.onPrimary }]}>
              Next
            </Text>
            <ArrowRight size={20} color={colors.onPrimary} />
          </Pressable>

          <Pressable
            onPress={() => router.replace("/(tabs)")}
            style={styles.skipButton}
          >
            <Text style={[styles.skipLabel, { color: colors.textSecondary }]}>
              Skip
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroImage: {
    width: "100%",
    height: "60%",
  },
  bottomArea: {
    flex: 1,
    marginTop: -Radius.xl,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.containerPadding,
    paddingTop: Spacing.six,
    paddingBottom: Spacing.four,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.three,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
  },
  title: {
    ...Typography.headlineLg,
    fontSize: 34,
    textAlign: "center",
    marginTop: Spacing.two,
  },
  subtitle: {
    ...Typography.bodyMd,
    textAlign: "center",
    paddingHorizontal: Spacing.four,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.two,
    borderRadius: Radius.pill,
    height: 56,
    width: "100%",
    marginTop: Spacing.three,
  },
  nextLabel: {
    ...Typography.titleMd,
    fontSize: 18,
  },
  skipButton: {
    paddingVertical: Spacing.two,
  },
  skipLabel: {
    ...Typography.bodyMd,
  },
});
