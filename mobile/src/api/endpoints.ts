import { http } from "@/lib/http";
import type { BriefRequest, BriefResult } from "@/types/api";

export async function generateBrief(
  request: BriefRequest,
): Promise<BriefResult> {
  const { data } = await http.post<BriefResult>("/api/briefs/", {
    brand_name: request.brandName,
    platform: request.platform,
    goal: request.goal,
    tone: request.tone,
  });

  return data;
}
