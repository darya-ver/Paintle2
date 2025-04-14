import { INDEX_TO_EMOJI, UN_REVEALED_SQUARE } from "./constants";

export const formatCopyContent = (
  clickedTileIndexes: number[],
  isWin: boolean
) => {
  const now = new Date();
  const dateString = now.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  });

  let text = `www.paintle.art ${dateString}\n`;
  text +=
    "Revealed " + (isWin ? clickedTileIndexes.length : "X") + " / 16 tiles\n\n";

  const size = 4;
  for (let x = 0; x < size * size; x++) {
    if (clickedTileIndexes.includes(x)) {
      const indexPositionRevealed = clickedTileIndexes.indexOf(x);
      text += INDEX_TO_EMOJI[indexPositionRevealed] + " ";
    } else {
      text += UN_REVEALED_SQUARE + " ";
    }
    if (x % size === size - 1) {
      text += "\n";
    }
  }
  return text;
};

export const getTimeUntilNextPaintle = (secondsTillMidnight: number) => {
  const hoursTillMidnight = Math.floor(secondsTillMidnight / 3600)
    .toString()
    .padStart(2, "0");
  const minsTillMidnight = (Math.floor(secondsTillMidnight / 60) % 60)
    .toString()
    .padStart(2, "0");
  const secsTillMidnight = (Math.floor(secondsTillMidnight) % 60)
    .toString()
    .padStart(2, "0");

  return `${hoursTillMidnight}:${minsTillMidnight}:${secsTillMidnight}`;
};
