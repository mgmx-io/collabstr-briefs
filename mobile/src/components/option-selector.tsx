import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fontSize, fontWeight, radius, space } from "@/theme";

type Props<T extends string> = {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (value: T | null) => void;
};

export function OptionSelector<T extends string>({
  label,
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {options.map((option) => {
          const selected = option === value;

          return (
            <Pressable
              key={option}
              style={[styles.chip, selected && styles.chipSelected]}
              onPress={() => onChange(selected ? null : option)}
            >
              <Text
                style={[styles.chipText, selected && styles.chipTextSelected]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
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
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space[2],
  },
  chip: {
    backgroundColor: colors.bgSecondary,
    borderColor: colors.borderSubtle,
    borderRadius: radius.full,
    borderWidth: 1,
    paddingHorizontal: space[4],
    paddingVertical: space[2],
  },
  chipSelected: {
    backgroundColor: colors.bgInverse,
    borderColor: colors.bgInverse,
  },
  chipText: {
    color: colors.textSubtle,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  chipTextSelected: {
    color: colors.textInverse,
  },
});
