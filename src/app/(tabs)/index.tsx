import Categories from "@/components/home/categories";
import FeaturedProducts from "@/components/home/featured-products";
import { TrendingProductCard } from "@/components/home/trending-product-card";
import { SectionHeaderTitle } from "@/components/section-header-title";
import { Spacing } from "@/constants/theme";
import { trendingProducts } from "@/mock/products";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Our categories */}
        <Categories />

        {/* Featured products */}
        <View style={styles.sectionWrapper}>
          <SectionHeaderTitle title="Featured Products" />
          <FeaturedProducts />
        </View>

        <View style={styles.sectionWrapper}>
          <SectionHeaderTitle title="Trending Products" />
          {trendingProducts.map((product) => (
            <TrendingProductCard
              key={product.title}
              category={product.category}
              imageUrl={product.imageUrl}
              label={product.label}
              price={product.price}
              title={product.title}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.containerPadding,
    width: "100%",
  },
  sectionWrapper: {
    gap: Spacing.stackGapMd,
    marginTop: Spacing.two,
  },
});
