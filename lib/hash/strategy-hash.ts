import { stableStringify } from "@/lib/stable-json";

export { stableStringify } from "@/lib/stable-json";

export async function generateStrategyHash(spec: unknown) {
  const stableJson = stableStringify(spec);
  const bytes = new TextEncoder().encode(stableJson);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hex = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return `0x${hex}`;
}
