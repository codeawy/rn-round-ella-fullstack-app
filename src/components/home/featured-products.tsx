import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { Product } from "@/mock/products";
import { supabase } from "@/utils/supabase";

const FeaturedProducts = () => {
  const colors = Colors.light;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("name, price, image_url, category")
        .limit(6);

      if (data) {
        setProducts(
          data.map((p) => ({
            title: p.name,
            price: `$${p.price}`,
            imageUrl: p.image_url,
            category: p.category,
          })),
        );
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={{ color: colors.textSecondary }}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.featuredRow}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {products.map((product, idx) => (
        <ProductCard key={idx} product={product} />
      ))}
    </ScrollView>
  );
};

import ProductCard from "../shared/product-card";

export default FeaturedProducts;

const styles = StyleSheet.create({
  featuredRow: {
    gap: 14,
  },
  empty: {
    height: 278,
    justifyContent: "center",
    alignItems: "center",
  },
});
