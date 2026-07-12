export type Platform = "Instagram" | "TikTok" | "UGC";

export type Goal = "Awareness" | "Conversions" | "Content Assets";

export type Tone = "Professional" | "Friendly" | "Playful";

export type BriefRequest = {
  brandName: string;
  platform: Platform;
  goal: Goal;
  tone: Tone;
};

export type BriefMetrics = {
  latency_ms: number;
  input_tokens: number;
  output_tokens: number;
};

export type BriefResult = {
  brief: string;
  angles: string[];
  criteria: string[];
  metrics: BriefMetrics;
};
