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
              : "Search for a painting..."
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
              backgroundColor: "#fff5f6",
              border: "3px solid #f1dddf",
              boxShadow: "none",
              "&:hover": {
                border: "1px solid #aaa",
              },
              color: "#90575d",
            }),
            menu: (base) => ({
              ...base,
              zIndex: 9999,
              backgroundColor: "#fff5f6",
              border: "3px solid #f1dddf",
              color: "#90575d",
            }),
            singleValue: (base) => ({
              ...base,
              color: "#90575d",
            }),
            placeholder: (base) => ({
              ...base,
              color: "#90575d",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected
                ? "#cc9399"
                : base.backgroundColor,
            }),
            clearIndicator: (base) => ({
              ...base,
              color: "#90575d",
              "&:hover": {
                color: "#90575d",
              },
            }),
            dropdownIndicator: (base) => ({
              ...base,
              color: "#90575d",
              "&:hover": {
                color: "#90575d",
              },
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
