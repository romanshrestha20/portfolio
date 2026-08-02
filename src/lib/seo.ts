export const SITE_URL = "https://www.roman-shrestha.info";

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, SITE_URL).toString();
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
