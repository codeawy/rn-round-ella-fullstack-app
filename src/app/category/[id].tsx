import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Image } from "expo-image";

import { supabase } from "@/utils/supabase";
import { Colors, Radius, Spacing, Typography } from "@/constants/theme";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

export default function CategoryProducts() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const colors = Colors.light;
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", id)
        .order("name");

      if (data) setProducts(data);
    };

    fetchProducts();
  }, [id]);

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={[styles.productCard, { backgroundColor: colors.surfaceLowest }]}>
      <Image
        source={{ uri: item.image_url }}
        style={styles.productImage}
        contentFit="cover"
        transition={120}
      />
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: colors.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.productCategory, { color: colors.textSecondary }]}>
          {item.category}
        </Text>
        <Text style={[styles.productPrice, { color: colors.primary }]}>
          ${item.price}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView edges={["top"]}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: colors.backgroundElement }]}
            hitSlop={12}
          >
            <ArrowLeft size={20} color={colors.text} />
          </Pressable>
          <Text style={[styles.screenTitle, { color: colors.text }]} numberOfLines={1}>
            {name || "Category"}
          </Text>
          <View style={styles.backButton} />
        </View>
      </SafeAreaView>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No products in this category yet.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.containerPadding,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.four,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  screenTitle: {
    ...Typography.headlineLg,
    fontSize: 24,
    flex: 1,
    textAlign: "center",
  },
  list: {
    paddingHorizontal: Spacing.containerPadding,
    gap: Spacing.three,
    paddingBottom: Spacing.five,
  },
  productCard: {
    flexDirection: "row",
    borderRadius: Radius.lg,
    overflow: "hidden",
    gap: Spacing.three,
  },
  productImage: {
    width: 110,
    height: 110,
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: Spacing.three,
  },
  productName: {
    ...Typography.titleMd,
    marginBottom: 2,
  },
  productCategory: {
    ...Typography.bodySm,
    marginBottom: Spacing.one,
  },
  productPrice: {
    ...Typography.priceLg,
  },
  empty: {
    alignItems: "center",
    paddingTop: Spacing.ten,
  },
  emptyText: {
    ...Typography.bodyMd,
  },
});
