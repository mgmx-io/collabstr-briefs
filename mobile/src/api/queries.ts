import { useMutation } from "@tanstack/react-query";
import { generateBrief } from "./endpoints";

export function useGenerateBrief() {
  return useMutation({ mutationFn: generateBrief });
}
