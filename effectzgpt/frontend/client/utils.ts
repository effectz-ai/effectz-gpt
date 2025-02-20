export function getBaseURL(): string {
  return process.env.NEXT_PUBLIC_CHAT_API_BASE_URL ?? "http://localhost:5000";
}
