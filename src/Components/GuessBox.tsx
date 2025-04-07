import Select from "react-select";

type GuessBoxProps = {
  currentGuess: string;
  setCurrentGuess: React.Dispatch<React.SetStateAction<string>>;
  onSubmitGuess: () => void;
  options: { value: string; name: string; artist: string; date: string }[];
};

export const GuessBox = ({
  currentGuess,
  setCurrentGuess,
  onSubmitGuess,
  options,
}: GuessBoxProps) => {
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
              <b>{option.name}</b> — {option.artist} ({option.date})
            </div>
          )}
          isClearable
        />
        <button onClick={() => onSubmitGuess()} disabled={currentGuess === ""}>
          Submit
        </button>
      </div>
    </div>
  );
};
