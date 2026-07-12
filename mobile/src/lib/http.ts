import { create } from "axios";

export const http = create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});
