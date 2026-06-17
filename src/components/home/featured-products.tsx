import { featuredProducts } from "@/mock/products";
import { ScrollView, StyleSheet } from "react-native";
import ProductCard from "../shared/product-card";

const FeaturedProducts = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.featuredRow}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {featuredProducts.map((product, idx) => (
        <ProductCard key={idx} product={product} />
      ))}
    </ScrollView>
  );
};

export default FeaturedProducts;

const styles = StyleSheet.create({
  featuredRow: {
    gap: 14,
  },
});
