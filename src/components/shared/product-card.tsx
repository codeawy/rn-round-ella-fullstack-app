import { Colors, Radius, Spacing, Typography } from "@/constants/theme";
import { Product } from "@/mock/products";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppSymbol } from "../ui/app-symbol";

const ProductCard = ({ product }: { product: Product }) => {
  const colors = Colors.light;

  const { title, price, category, imageUrl } = product;

  return (
    <View style={styles.card}>
      <View
        style={[styles.imageWrap, { backgroundColor: colors.surfaceLowest }]}
      >
        <Image
          contentFit="cover"
          source={{ uri: imageUrl }}
          style={styles.image}
          transition={120}
        />

        <Pressable
          accessibilityLabel={`Save ${title}`}
          style={[
            styles.favoriteButton,
            { backgroundColor: "rgba(255,255,255,0.92)" },
          ]}
        >
          <AppSymbol
            color={colors.text}
            name={{ ios: "heart", android: "favorite" }}
            size={16}
          />
        </Pressable>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.textGroup}>
          <Text
            numberOfLines={1}
            style={[styles.title, { color: colors.text }]}
          >
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.category, { color: colors.textSecondary }]}
          >
            {category}
          </Text>
        </View>

        <Text style={[styles.price, { color: colors.primary }]}>{price}</Text>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: 218,
  },
  imageWrap: {
    borderRadius: 20,
    height: 278,
    marginBottom: 16,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  favoriteButton: {
    alignItems: "center",
    borderRadius: Radius.full,
    height: 28,
    justifyContent: "center",
    position: "absolute",
    right: 14,
    top: 14,
    width: 28,
  },
  metaRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textGroup: {
    flex: 1,
    marginRight: Spacing.three,
  },
  title: {
    ...Typography.bodyMd,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  category: {
    ...Typography.bodySm,
    marginTop: 2,
  },
  price: {
    ...Typography.priceLg,
    paddingBottom: 1,
  },
  heart: {
    position: "absolute",
    right: 10,
    top: -50,
  },
});
