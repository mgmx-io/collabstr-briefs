import type { StaticScreenProps } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Banner } from "@/components/banner";
import { colors, fontSize, fontWeight, space } from "@/theme";
import type { BriefMetrics, BriefResult } from "@/types/api";

type Props = StaticScreenProps<BriefResult>;

function formatMetrics(metrics: BriefMetrics): string {
  const { latency_ms, input_tokens, output_tokens } = metrics;
  return `${latency_ms}ms · ${input_tokens} tokens in · ${output_tokens} tokens out`;
}

export function Result({ route }: Props) {
  const { brief, angles, criteria, metrics } = route.params;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.brief}>{brief}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Content angles</Text>
        {angles.map((angle, index) => (
          <View key={angle} style={styles.item}>
            <Text style={styles.itemMarker}>{index + 1}.</Text>
            <Text style={styles.itemText}>{angle}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Creator criteria</Text>
        {criteria.map((criterion) => (
          <View key={criterion} style={styles.item}>
            <Text style={styles.itemMarker}>•</Text>
            <Text style={styles.itemText}>{criterion}</Text>
          </View>
        ))}
      </View>

      <Banner variant="info" message={formatMetrics(metrics)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.bgPrimary,
    flex: 1,
  },
  content: {
    gap: space[6],
    padding: space[6],
  },
  brief: {
    color: colors.textDefault,
    fontSize: fontSize.base,
    lineHeight: 26,
  },
  section: {
    gap: space[2],
  },
  sectionTitle: {
    color: colors.textDefault,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  item: {
    flexDirection: "row",
    gap: space[2],
  },
  itemMarker: {
    color: colors.textSubtle,
    fontSize: fontSize.base,
    lineHeight: 24,
  },
  itemText: {
    color: colors.textDefault,
    flex: 1,
    fontSize: fontSize.base,
    lineHeight: 24,
  },
});
