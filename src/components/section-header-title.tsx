import { StyleSheet, Text, View } from "react-native";

import { Colors, Typography } from "@/constants/theme";

type HomeSectionTitleProps = {
  title: string;
};

export function SectionHeaderTitle({ title }: HomeSectionTitleProps) {
  return (
    <View>
      <Text style={[styles.title, { color: Colors.light.text }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    ...Typography.titleMd,
    letterSpacing: -0.3,
  },
});
