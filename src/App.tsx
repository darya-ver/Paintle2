import { useMemo, useRef, useState } from "react";
import { GuessBox } from "./Components/GuessBox";
import { Header } from "./Components/Header";
import { PaintingOfTheDay } from "./Components/PaintingOfTheDay";
import painting_data from "../public/final_image_data.json";
import { ResultsModal } from "./Components/ResultsModal";
import { getAnswer, getValueFromPainting } from "./utils";
import { useGuessState } from "./hooks/useGuessState";
import { useTimeToNextPaintle } from "./hooks/useTimeToNextPaintle";
import { DatePickerModal } from "./Components/DatePickerModal";
import { Button } from "./Components/Button";

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [dateOfPainting, setDateOfPainting] = useState<Date>(new Date());
  const [datePickerModalOpen, setDatePickerModalOpen] = useState(false);

  const { selectedAnswer, answerLabel } = useMemo(() => {
    return getAnswer(painting_data, dateOfPainting);
  }, [dateOfPainting]);

  const [clickedTileIndexes, setClickedTileIndexes] = useState<number[]>([]);
  const { timeToNextPaintle } = useTimeToNextPaintle();
  const {
    currentGuess,
    setCurrentGuess,
    numOfGuesses,
    showResultsModal,
    isWin,
    isBadGuess,
    onSubmitGuess,
    onGiveUp,
    onCloseModal,
  } = useGuessState({ answerLabel });

  return (
    <div className="App">
      <Header />
      <div className="MorePaintlesButton">
        <Button
          onClick={() => {
            setDatePickerModalOpen(true);
          }}
          sizing="LessPadding"
        >
          Past
        </Button>
      </div>
      <div ref={containerRef} style={{ width: "100%", flexGrow: 1 }}>
        <PaintingOfTheDay
          imageUrl={`/images/${selectedAnswer.filename}`}
          containerRef={containerRef}
          clickedTileIndexes={clickedTileIndexes}
          setClickedTileIndexes={setClickedTileIndexes}
        />
      </div>
      <GuessBox
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        onSubmitGuess={onSubmitGuess}
        isBadGuess={isBadGuess}
        options={painting_data.map((answer) => ({
          value: getValueFromPainting(answer),
          artist: answer.attribution,
          name: answer.title,
          date: answer.displaydate,
        }))}
        needsToClickAnotherTile={numOfGuesses === clickedTileIndexes.length}
        openedAllTiles={clickedTileIndexes.length === 16}
        onGiveUp={onGiveUp}
      />
      <ResultsModal
        isOpen={showResultsModal}
        onClose={onCloseModal}
        isWin={isWin}
        correctAnswer={selectedAnswer}
        timeToNextPaintle={timeToNextPaintle}
        clickedTileIndexes={clickedTileIndexes}
        dateOfPainting={dateOfPainting}
      />
      <DatePickerModal
        datePickerModalOpen={datePickerModalOpen}
        onModalClose={() => setDatePickerModalOpen(false)}
        onPlay={(date) => {
          setDateOfPainting(date);
          setClickedTileIndexes([]);
          setCurrentGuess("");
        }}
      />
    </div>
  );
}

export default App;
