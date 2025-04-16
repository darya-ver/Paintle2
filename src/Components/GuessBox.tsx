import { useMemo } from "react";
import Select from "react-select";
import { PaintingName } from "./PaintingName";
import { Button } from "./Button";

type GuessBoxProps = {
  currentGuess: string;
  setCurrentGuess: React.Dispatch<React.SetStateAction<string>>;
  onSubmitGuess: () => void;
  isBadGuess: boolean;
  options: { value: string; name: string; artist: string; date: string }[];
  needsToClickAnotherTile: boolean;
  openedAllTiles: boolean;
  onGiveUp: () => void;
};

export const GuessBox = ({
  currentGuess,
  setCurrentGuess,
  onSubmitGuess,
  isBadGuess,
  options,
  needsToClickAnotherTile,
  openedAllTiles,
  onGiveUp,
}: GuessBoxProps) => {
  const buttonText = useMemo(() => {
    if (isBadGuess) {
      return "Incorrect";
    }
    if (needsToClickAnotherTile) {
      return "Click another tile";
    }
    return "Submit";
  }, [needsToClickAnotherTile, isBadGuess]);

  return (
    <div className="GuessBox">
      <div className="InputContainer">
        <Select
          value={options.find((opt) => opt.value === currentGuess) || null}
          options={options}
          placeholder={
            needsToClickAnotherTile
              ? "Please select a tile to reveal"
              : "Type to search for a painting..."
          }
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
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#e2f7e2",
              border: "1px solid #ccc",
              boxShadow: "none",
              "&:hover": {
                border: "1px solid #aaa",
              },
            }),
            menu: (base) => ({
              ...base,
              zIndex: 9999,
              backgroundColor: "#e2f7e2",
            }),
          }}
        />
        <div className="GuessButtonContainer">
          <Button
            onClick={() => onSubmitGuess()}
            disabled={currentGuess === ""}
            variant={isBadGuess ? "Angry" : "Primary"}
            style={{
              flexGrow: 1,
            }}
          >
            {buttonText}
          </Button>
          {openedAllTiles && (
            <Button onClick={onGiveUp} variant="Secondary">
              I give up
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
