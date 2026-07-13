import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useGenerateBrief } from "@/api/queries";
import { OptionSelector } from "@/components/option-selector";
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
    <View>
      <TextInput
        value={form.brandName}
        onChangeText={(brandName) =>
          setForm((prev) => ({ ...prev, brandName }))
        }
        placeholder="Brand name"
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

      {error != null && <Text>{error.message}</Text>}

      <Button
        title={isPending ? "Generating..." : "Generate"}
        onPress={handleSubmit}
        disabled={!canSubmit}
      />
    </View>
  );
}
