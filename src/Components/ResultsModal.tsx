import { useMemo, useState } from "react";
import Modal from "react-modal";
import { Answer } from "../types";
import { PaintingName } from "./PaintingName";
import { formatCopyContent } from "../utils";
import { Button } from "./Button";

type ResultsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isWin: boolean;
  correctAnswer: Answer;
  timeToNextPaintle: string;
  clickedTileIndexes: number[];
};

export const ResultsModal = ({
  isOpen,
  onClose,
  isWin,
  correctAnswer,
  timeToNextPaintle,
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
    return (
      <p>
        Time until next Paintle: <code>{timeToNextPaintle}.</code>
      </p>
    );
  }, [timeToNextPaintle]);

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Example Modal"
      style={{
        content: {
          backgroundColor: "#cff6cf",
          inset: "20px",
        },
      }}
    >
      <div className="ModalContent">
        <div className="ModalClose">
          <Button onClick={onClose} variant="Blank">
            <svg height="25" width="25">
              <g transform="translate(3.9661017,3.5677966)">
                <path
                  stroke="rgb(56,83,56)"
                  stroke-width="3"
                  d="M -2.5783352e-4,-0.00146808 17.435473,18.212367"
                />
                <path
                  stroke="rgb(56,83,56)"
                  stroke-width="3"
                  d="M -2.5783352e-4,18.212367 17.435473,-0.00146808"
                />
              </g>
            </svg>
          </Button>
        </div>
        <div className="ModalCenterContent">
          {isWin ? winContent : loseContent}
          {timeUntilNextPaintle}
        </div>
        <Button
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
          {copied ? "Copied! ✔" : "Copy to Clipboard"}
        </Button>
      </div>
    </Modal>
  );
};
