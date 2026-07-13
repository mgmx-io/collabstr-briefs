import { StyleSheet, Text, TextInput, View } from "react-native";
import type { TextInputProps } from "react-native";
import { colors, fontSize, fontWeight, radius, space } from "@/theme";

type Props = TextInputProps & {
  label: string;
};

export function TextField({ label, ...inputProps }: Props) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.textPlaceholder}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: space[2],
  },
  label: {
    color: colors.textDefault,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  input: {
    borderColor: colors.borderDefault,
    borderRadius: radius.md,
    borderWidth: 2,
    color: colors.textDefault,
    fontSize: fontSize.base,
    paddingHorizontal: space[4],
    paddingVertical: space[3],
  },
});
