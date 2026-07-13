import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors, fontSize, fontWeight, radius } from "@/theme";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export function Button({
  title,
  onPress,
  disabled = false,
  loading = false,
}: Props) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator color={colors.textInverse} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.bgInverse,
    borderRadius: radius.md,
    justifyContent: "center",
    minHeight: 48,
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    color: colors.textInverse,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
});
