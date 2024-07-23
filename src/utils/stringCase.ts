export const toTitleCase = function toTitleCase(str: string): string {
  return str.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase());
};

export const capitalize = function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
