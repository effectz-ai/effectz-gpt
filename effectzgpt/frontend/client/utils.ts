export function getBaseURL(): string {
  // If we are in development, use the local backend endpoint
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "dev") {
    return "http://localhost:5001";
  }
  return typeof window !== "undefined" ? window.location.origin : "";
}
