import { useRef, useState } from "react";
import { GuessBox } from "./Components/GuessBox";
import { Header } from "./Components/Header";
import { PaintingOfTheDay } from "./Components/PaintingOfTheDay";
import painting_data from "../public/final_image_data.json";
import { ResultsModal } from "./Components/ResultsModal";
import { getAnswer, getValueFromPainting } from "./utils";
import { useGuessState } from "./hooks/useGuessState";
import { useTimeToNextPaintle } from "./hooks/useTimeToNextPaintle";

const { selectedAnswer, answerLabel } = getAnswer(painting_data);

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
      <div
        ref={containerRef}
        style={{ width: "100%", flexGrow: 1, padding: "1rem" }}
      >
        <PaintingOfTheDay
          imageUrl={`/Paintle2/images/${selectedAnswer.filename}`}
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
      />
    </div>
  );
}

export default App;
