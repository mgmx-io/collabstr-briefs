import { useNavigation } from "@react-navigation/native";
import { isAxiosError } from "axios";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useGenerateBrief } from "@/api/queries";
import { Button } from "@/components/button";
import { Banner } from "@/components/banner";
import { OptionSelector } from "@/components/option-selector";
import { TextField } from "@/components/text-field";
import { colors, space } from "@/theme";
import type { BriefRequest, Goal, Platform, Tone } from "@/types/api";

const PLATFORMS = ["Instagram", "TikTok", "UGC"] satisfies Platform[];
const GOALS = ["Awareness", "Conversions", "Content Assets"] satisfies Goal[];
const TONES = ["Professional", "Friendly", "Playful"] satisfies Tone[];

type FormState = {
  brandName: string;
  platform: Platform | null;
  goal: Goal | null;
  tone: Tone | null;
};

const initialForm: FormState = {
  brandName: "",
  platform: null,
  goal: null,
  tone: null,
};

function buildPayload(form: FormState): BriefRequest | null {
  const { platform, goal, tone } = form;
  const brandName = form.brandName.trim();
  if (!brandName || !platform || !goal || !tone) return null;
  return { brandName, platform, goal, tone };
}

function formatError(error: Error): string {
  if (isAxiosError(error) && typeof error.response?.data?.error === "string") {
    return error.response.data.error;
  }

  return "Something went wrong. Please try again.";
}

export function Form() {
  const navigation = useNavigation();
  const [form, setForm] = useState(initialForm);
  const { mutate, isPending, error } = useGenerateBrief();
  const payload = buildPayload(form);
  const canSubmit = payload != null && !isPending;

  const handleSubmit = () => {
    if (payload == null) return;

    mutate(payload, {
      onSuccess: (data) => navigation.navigate("Result", data),
    });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <TextField
        label="Brand name"
        value={form.brandName}
        onChangeText={(brandName) =>
          setForm((prev) => ({ ...prev, brandName }))
        }
        placeholder="e.g. Nike"
        autoCorrect={false}
      />

      <OptionSelector
        label="Platform"
        options={PLATFORMS}
        value={form.platform}
        onChange={(platform) => setForm((prev) => ({ ...prev, platform }))}
      />

      <OptionSelector
        label="Goal"
        options={GOALS}
        value={form.goal}
        onChange={(goal) => setForm((prev) => ({ ...prev, goal }))}
      />

      <OptionSelector
        label="Tone"
        options={TONES}
        value={form.tone}
        onChange={(tone) => setForm((prev) => ({ ...prev, tone }))}
      />

      {error != null && <Banner variant="error" message={formatError(error)} />}

      <Button
        title="Generate"
        onPress={handleSubmit}
        disabled={!canSubmit}
        loading={isPending}
      />
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
});
