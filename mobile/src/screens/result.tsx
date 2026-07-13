import type { StaticScreenProps } from "@react-navigation/native";
import type { BriefResult } from "@/types/api";
import { Text, View } from "react-native";

type Props = StaticScreenProps<BriefResult>;

export function Result({ route }: Props) {
  const { brief, angles, criteria, metrics } = route.params;

  return (
    <View>
      <Text>{brief}</Text>

      {angles.map((angle, index) => (
        <Text key={angle}>
          {index + 1}. {angle}
        </Text>
      ))}

      {criteria.map((criterion) => (
        <Text key={criterion}>• {criterion}</Text>
      ))}

      <Text>
        {metrics.latency_ms}ms · {metrics.input_tokens} in ·{" "}
        {metrics.output_tokens} out
      </Text>
    </View>
  );
}
