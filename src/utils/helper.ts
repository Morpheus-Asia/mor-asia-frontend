export const getTruncatedTitle = (title: string): string => {
  if (!title) return "Untitled";
  const maxLength = 60;
  if (title.length <= maxLength) return title;

  const truncated = title.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  return lastSpace > 30
    ? truncated.slice(0, lastSpace) + "..."
    : truncated + "...";
};

export const getPreviewText = (body: string): string => {
  if (!body) return "No content available";

  // Remove markdown images and links first
  let cleanText = body.replace(/!\[.*?\]\(.*?\)/g, "");
  cleanText = cleanText.replace(/\[.*?\]\(.*?\)/g, "");
  cleanText = cleanText.replace(/https?:\/\/[^\s]+/g, "");
  cleanText = cleanText.replace(/#{1,6}\s/g, ""); // Remove markdown headers
  cleanText = cleanText.replace(/\*\*(.*?)\*\*/g, "$1"); // Remove bold markdown
  cleanText = cleanText.replace(/\*(.*?)\*/g, "$1"); // Remove italic markdown

  // Remove extra whitespace and newlines
  cleanText = cleanText.replace(/\s+/g, " ").trim();

  // Split into words
  const words = cleanText.split(" ");
  const maxLines = 2;
  const wordsPerLine = 8; // Approximate words per line
  const maxWords = maxLines * wordsPerLine;

  if (words.length <= maxWords) return cleanText;

  // Take only the words that fit in maxLines
  const truncated = words.slice(0, maxWords).join(" ");
  return truncated + "...";
};
