import { StyleSheet, Text, View } from 'react-native';

import { Colors, Typography } from '@/constants/theme';

export function AuthDivider() {
  const colors = Colors.light;

  return (
    <View style={styles.row}>
      <View style={[styles.line, { backgroundColor: colors.border }]} />
      <Text style={[styles.label, { color: colors.textSecondary }]}>OR CONTINUE WITH</Text>
      <View style={[styles.line, { backgroundColor: colors.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  label: {
    ...Typography.labelCaps,
    fontWeight: '500',
    letterSpacing: 1,
  },
});
