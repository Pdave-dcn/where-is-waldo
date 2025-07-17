export const getCharacterEmoji = (character: string) => {
  switch (character.toLowerCase()) {
    case "waldo":
      return "🔴";
    case "odlaw":
      return "🟡";
    case "wenda":
      return "🔵";
    case "woof":
      return "🐕";
    case "wizard":
      return "🧙‍♂️";
    default:
      return "❓";
  }
};
