import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { Colors, Radius, Typography } from "@/constants/theme";

type TrendingProductCardProps = {
  category: string;
  imageUrl: string;
  label: string;
  price: string;
  title: string;
};

export function TrendingProductCard({
  category,
  imageUrl,
  label,
  price,
  title,
}: TrendingProductCardProps) {
  const colors = Colors.light;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surfaceLowest, shadowColor: colors.shadow },
      ]}
    >
      <Image
        contentFit="cover"
        source={{ uri: imageUrl }}
        style={styles.image}
        transition={120}
      />

      <View style={styles.content}>
        <View style={[styles.pill, { backgroundColor: colors.surfaceHigh }]}>
          <Text style={[styles.pillLabel, { color: colors.text }]}>
            {label}
          </Text>
        </View>

        <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.category, { color: colors.textSecondary }]}
        >
          {category}
        </Text>
        <Text style={[styles.price, { color: colors.secondary }]}>{price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    flexDirection: "row",
    minHeight: 128,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 22,
  },
  image: {
    height: "auto",
    width: 116,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  pill: {
    alignSelf: "flex-start",
    borderRadius: Radius.full,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pillLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  title: {
    ...Typography.bodyMd,
    fontWeight: "700",
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  category: {
    ...Typography.bodySm,
    marginBottom: 8,
  },
  price: {
    ...Typography.titleMd,
    fontWeight: "700",
  },
});
