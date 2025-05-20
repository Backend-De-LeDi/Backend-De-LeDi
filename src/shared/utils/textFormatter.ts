export const formatter = (text: string): string => {
  const formattedText = text.trim().replace(/ /g, "_").toLowerCase();
  return formattedText;
};
