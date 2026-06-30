import { useRouter } from "expo-router";
import { Footprints, Shirt, ShoppingBag, Watch } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Radius, Spacing, Typography } from "@/constants/theme";
import { supabase } from "@/utils/supabase";

interface Category {
  id: string;
  name: string;
  icon: string;
  product_count: number;
}

const ICON_MAP: Record<
  string,
  React.ComponentType<{ size: number; color: string }>
> = {
  footprints: Footprints,
  watch: Watch,
  shirt: Shirt,
  bag: ShoppingBag,
};

export default function CategoriesScreen() {
  const colors = Colors.light;
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("id, name, icon, products:id(count)")
        .order("name");

      if (data) {
        setCategories(
          data.map((c) => ({
            id: c.id,
            name: c.name,
            icon: c.icon,
            product_count: Array.isArray(c.products) ? c.products.length : 0,
          })),
        );
      }
    };

    fetchCategories();
  }, []);

  const renderCategory = ({ item }: { item: Category }) => {
    const IconComponent = ICON_MAP[item.icon] || ShoppingBag;

    return (
      <Pressable
        onPress={() =>
          router.push({ pathname: "/category/[id]", params: { id: item.id, name: item.name } })
        }
        style={[
          styles.card,
          {
            backgroundColor: colors.surfaceLowest,
            borderColor: colors.outlineVariant,
          },
        ]}
      >
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: colors.backgroundElement },
          ]}
        >
          <IconComponent size={28} color={colors.text} />
        </View>
        <View style={styles.cardText}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.cardCount, { color: colors.textSecondary }]}>
            {item.product_count}{" "}
            {item.product_count === 1 ? "product" : "products"}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView edges={["top"]}>
        <Text style={[styles.screenTitle, { color: colors.text }]}>
          Categories
        </Text>
      </SafeAreaView>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenTitle: {
    ...Typography.headlineLg,
    paddingHorizontal: Spacing.containerPadding,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.five,
  },
  list: {
    paddingHorizontal: Spacing.containerPadding,
    gap: Spacing.three,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.four,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: Spacing.four,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    ...Typography.titleMd,
    marginBottom: 2,
  },
  cardCount: {
    ...Typography.bodySm,
  },
});
