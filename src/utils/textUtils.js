export function toTitleCase(text = "") {
  return text
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
