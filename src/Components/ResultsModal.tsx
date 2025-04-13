import { useMemo, useState } from "react";
import Modal from "react-modal";

const INDEX_TO_EMOJI: {
  [key: number]: string;
} = {
  0: "1️⃣",
  1: "2️⃣",
  2: "3️⃣",
  3: "4️⃣",
  4: "5️⃣",
  5: "6️⃣",
  6: "7️⃣",
  7: "8️⃣",
  8: "9️⃣",
  9: "🇦",
  10: "🇧",
  11: "🇨",
  12: "🇩",
  13: "🇪",
  14: "🇫",
  15: "🇬",
};

const formatCopyContent = (clickedTileIndexes: number[], isWin: boolean) => {
  const now = new Date();
  const dateString = now.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  });
  let text = `www.paintle.art ${dateString}\n`;
  text +=
    "Revealed " + (isWin ? clickedTileIndexes.length : "X") + " / 16 tiles\n\n";
  const unRevealedSquare = "⬜";

  const size = 4;
  for (let x = 0; x < size * size; x++) {
    if (clickedTileIndexes.includes(x)) {
      const indexPositionRevealed = clickedTileIndexes.indexOf(x);
      text += INDEX_TO_EMOJI[indexPositionRevealed] + " ";
    } else {
      text += unRevealedSquare + " ";
    }
    if (x % size === size - 1) {
      text += "\n";
    }
  }
  return text;
};

type ResultsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isWin: boolean;
  correctAnswer: string;
  secondsTillMidnight: number;
  clickedTileIndexes: number[];
};

export const ResultsModal = ({
  isOpen,
  onClose,
  isWin,
  correctAnswer,
  secondsTillMidnight,
  clickedTileIndexes,
}: ResultsModalProps) => {
  const [copied, setCopied] = useState(false);

  const winContent = useMemo(() => {
    return (
      <>
        <h2>Congratulations!</h2>
        <p>
          You successfully guessed today's Paintle with only{" "}
          <b>{clickedTileIndexes.length} tile(s)</b> revealed!
        </p>
      </>
    );
  }, [clickedTileIndexes]);

  const loseContent = useMemo(() => {
    return (
      <>
        <h2>Aw Shucks. Better Luck Next Time?</h2>
        <p>You unfortunately were unable to guess the correct answer :(</p>
        <p>
          The correct answer was: <b>{correctAnswer}.</b>
        </p>
      </>
    );
  }, [correctAnswer]);

  const timeUntilNextPaintle = useMemo(() => {
    const hoursTillMidnight = Math.floor(secondsTillMidnight / 3600)
      .toString()
      .padStart(2, "0");
    const minsTillMidnight = (Math.floor(secondsTillMidnight / 60) % 60)
      .toString()
      .padStart(2, "0");
    const secsTillMidnight = (Math.floor(secondsTillMidnight) % 60)
      .toString()
      .padStart(2, "0");

    const timeUntilNextPaintle = `${hoursTillMidnight}:${minsTillMidnight}:${secsTillMidnight}`;

    return <p>Time until next Paintle: {timeUntilNextPaintle}</p>;
  }, [secondsTillMidnight]);

  return (
    <Modal isOpen={isOpen} contentLabel="Example Modal">
      Modal content
      <button onClick={onClose}>Close</button>
      {isWin ? winContent : loseContent}
      {timeUntilNextPaintle}
      <button
        onClick={() => {
          navigator.clipboard.writeText(
            formatCopyContent(clickedTileIndexes, isWin)
          );
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
      >
        Copy results
      </button>
      {copied ? <> Copied!</> : null}
    </Modal>
  );
};

/*

www.paintle.art 4/13/25
Revealed 0 / 16 tiles

⬜⬜⬜⬜
0️⃣⬜⬜⬜
⬜⬜⬜⬜
⬜⬜⬜⬜

www.paintle.art 4/13/25
Revealed 4 / 16 tiles

⬜⬜⬜⬜
0️⃣1️⃣⬜⬜
3️⃣2️⃣4️⃣⬜
⬜⬜⬜⬜

www.paintle.art 4/13/25
Revealed 5 / 16 tiles

⬜⬜⬜⬜
0️⃣1️⃣⬜⬜
3️⃣2️⃣4️⃣⬜
⬜⬜⬜⬜


www.paintle.art 4/13/25
Revealed 12 / 16 tiles

8️⃣7️⃣6️⃣9️⃣
0️⃣1️⃣5️⃣🅰️
3️⃣2️⃣4️⃣🅱️
⬜⬜⬜⬜


www.paintle.art 4/13/25
Revealed 12 / 16 tiles

9️⃣8️⃣7️⃣🇦
1️⃣2️⃣6️⃣🇧
4️⃣3️⃣5️⃣🇨
⬜⬜⬜⬜

www.paintle.art 4/13/25
Revealed 16 / 16 tiles

🇬 8️⃣ 🇦 🇪 
2️⃣ 1️⃣ 7️⃣ 9️⃣ 
3️⃣ 4️⃣ 5️⃣ 🇩 
6️⃣ 🇫 🇧 🇨 

www.paintle.art 4/13/25
Revealed X / 16 tiles

🇬 8️⃣ 🇦 🇪 
2️⃣ 1️⃣ 7️⃣ 9️⃣ 
3️⃣ 4️⃣ 5️⃣ 🇩 
6️⃣ 🇫 🇧 🇨 

www.paintle.art 4/13/25
Revealed X / 16 tiles

⬜ ⬜ ⬜ ⬜ 
2️⃣ 1️⃣ ⬜ ⬜ 
⬜ ⬜ ⬜ ⬜ 
⬜ ⬜ ⬜ ⬜ 


www.paintle.art 4/13/25
Revealed X / 16 tiles

⬜ ⬜ ⬜ ⬜ 
2️⃣ 1️⃣ ⬜ ⬜ 
⬜ ⬜ ⬜ ⬜ 
⬜ ⬜ ⬜ ⬜ 

www.paintle.art 4/13/25
Revealed X / 16 tiles

⬜ ⬜ ⬜ ⬜ 
2️⃣ 1️⃣ ⬜ ⬜ 
⬜ ⬜ ⬜ ⬜ 
⬜ ⬜ ⬜ ⬜ 

www.paintle.art 4/13/25
Revealed X / 16 tiles

⬜ ⬜ ⬜ ⬜ 
2️⃣ 1️⃣ ⬜ ⬜ 
⬜ ⬜ ⬜ ⬜ 
⬜ ⬜ ⬜ ⬜ 

www.paintle.art 4/13/25
Revealed 2 / 16 tiles

⬜ ⬜ ⬜ ⬜ 
2️⃣ 1️⃣ ⬜ ⬜ 
⬜ ⬜ ⬜ ⬜ 
⬜ ⬜ ⬜ ⬜ 

*/
