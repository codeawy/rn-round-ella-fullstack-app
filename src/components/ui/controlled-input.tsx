import { ErrorMessage } from "@hookform/error-message";
import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

import { Colors, Radius, Typography } from "@/constants/theme";

type ControlledInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
  label: string;
} & TextInputProps;

export function ControlledInput<T extends FieldValues>({
  control,
  name,
  errors,
  label,
  ...textInputProps
}: ControlledInputProps<T>) {
  const colors = Colors.light;

  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <TextInput
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        {...textInputProps}
        style={[
          styles.input,
          {
            backgroundColor: colors.surfaceLowest,
            borderColor: errors[name] ? colors.error : colors.outlineVariant,
            color: colors.text,
          },
          textInputProps.style,
        ]}
      />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <Text style={[styles.error, { color: colors.error }]}>{message}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 8,
  },
  label: {
    ...Typography.labelCaps,
    fontSize: 13,
    letterSpacing: 1.2,
    paddingHorizontal: 2,
  },
  input: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    fontSize: 16,
    height: 56,
    paddingHorizontal: 16,
  },
  error: {
    ...Typography.bodySm,
    paddingHorizontal: 2,
  },
});
