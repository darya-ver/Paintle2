import { useMemo } from "react";
import Select from "react-select";
import { PaintingName } from "./PaintingName";

type GuessBoxProps = {
  currentGuess: string;
  setCurrentGuess: React.Dispatch<React.SetStateAction<string>>;
  onSubmitGuess: () => void;
  options: { value: string; name: string; artist: string; date: string }[];
  needsToClickAnotherTile: boolean;
  openedAllTiles: boolean;
  onGiveUp: () => void;
};

export const GuessBox = ({
  currentGuess,
  setCurrentGuess,
  onSubmitGuess,
  options,
  needsToClickAnotherTile,
  openedAllTiles,
  onGiveUp,
}: GuessBoxProps) => {
  const buttonText = useMemo(() => {
    if (needsToClickAnotherTile) {
      return "You need to click another tile before submitting your guess.";
    }
    return "Submit";
  }, [needsToClickAnotherTile]);

  return (
    <div className="GuessBox">
      <h2>Guess the Painting</h2>
      <div className="InputContainer">
        <Select
          value={options.find((opt) => opt.value === currentGuess) || null}
          options={options}
          onChange={(option) => {
            if (option) {
              setCurrentGuess(option.value);
            } else {
              setCurrentGuess("");
            }
          }}
          menuPlacement="top"
          formatOptionLabel={(option) => (
            <div>
              <PaintingName option={option} />
            </div>
          )}
          isClearable
          isDisabled={needsToClickAnotherTile}
        />
        <div className="GuessButtonContainer">
          <button
            onClick={() => onSubmitGuess()}
            disabled={currentGuess === ""}
            style={{
              flexGrow: 1,
            }}
          >
            {buttonText}
          </button>
          {openedAllTiles && <button onClick={onGiveUp}>I give up</button>}
        </div>
      </div>
    </div>
  );
};
