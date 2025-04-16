import { INDEX_TO_EMOJI, UN_REVEALED_SQUARE } from "./constants";
import { Answer } from "./types";

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

export const getValueFromPainting = (painting: {
  title: string;
  attribution: string;
}) => {
  const value = painting.title + " " + painting.attribution;
  return value;
};

export const getAnswer = (painting_data: Answer[]) => {
  const now = new Date();
  const startDate = new Date(2025, 3, 16); // day that we wrote this code

  // The days between the startDate and now
  const days = Math.floor(
    (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const selectedAnswer = painting_data[days % painting_data.length];
  const answerLabel = getValueFromPainting(selectedAnswer);

  console.log({ answerLabel });

  return { selectedAnswer, answerLabel };
};
