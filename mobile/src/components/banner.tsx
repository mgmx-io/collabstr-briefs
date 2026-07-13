import { StyleSheet, Text, View } from "react-native";
import { colors, fontSize, radius, space } from "@/theme";

type Variant = "error" | "info";

type Props = {
  message: string;
  variant: Variant;
};

export function Banner({ message, variant }: Props) {
  return (
    <View style={[styles.banner, variants[variant].box]}>
      <Text style={variants[variant].text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: radius.md,
    padding: space[3],
  },
  errorBox: {
    backgroundColor: colors.bgError,
  },
  errorText: {
    color: colors.error,
    fontSize: fontSize.sm,
  },
  infoBox: {
    backgroundColor: colors.bgSecondary,
  },
  infoText: {
    color: colors.textSubtlest,
    fontSize: fontSize.xs,
  },
});

const variants = {
  error: { box: styles.errorBox, text: styles.errorText },
  info: { box: styles.infoBox, text: styles.infoText },
} as const;
