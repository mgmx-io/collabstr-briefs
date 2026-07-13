import { Button, Text, View } from "react-native";

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
    <View>
      <Text>{label}</Text>
      {options.map((option) => {
        const selected = option === value;

        return (
          <Button
            key={option}
            title={selected ? `${option} ✓` : option}
            onPress={() => onChange(selected ? null : option)}
          />
        );
      })}
    </View>
  );
}
