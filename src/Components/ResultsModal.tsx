import { useMemo, useState } from "react";
import Modal from "react-modal";
import { Answer } from "../types";
import { PaintingName } from "./PaintingName";
import { formatCopyContent, getTimeUntilNextPaintle } from "../utils";

type ResultsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isWin: boolean;
  correctAnswer: Answer;
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
      <div>
        <h2>Aw Shucks. Better Luck Next Time?</h2>
        <p>You unfortunately were unable to guess the correct answer :(</p>
        <p>The correct answer was: </p>
        <p>
          <code>
            <PaintingName
              option={{
                name: correctAnswer.title,
                artist: correctAnswer.attribution,
                date: correctAnswer.displaydate,
              }}
            />
          </code>
        </p>
      </div>
    );
  }, [correctAnswer]);

  const timeUntilNextPaintle = useMemo(() => {
    const timeUntilNextPaintle = getTimeUntilNextPaintle(secondsTillMidnight);

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
