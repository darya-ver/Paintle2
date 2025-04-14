import { useRef, useState, useEffect } from "react";
import { GuessBox } from "./Components/GuessBox";
import { Header } from "./Components/Header";
import { PaintingOfTheDay } from "./Components/PaintingOfTheDay";
import painting_data from "./assets/final_image_data.json";
import { ResultsModal } from "./Components/ResultsModal";

const getValueFromPainting = (painting: {
  title: string;
  attribution: string;
}) => {
  const value = painting.title + " " + painting.attribution;
  return value;
};

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [image, setImage] = useState(null);
  const [clickedTileIndexes, setClickedTileIndexes] = useState<number[]>([]);
  const [numOfGuesses, setNumOfGuesses] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [showResultsModal, setShowResultsModal] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean>(false);

  const startDate = new Date(2025, 3, 6); // day that we wrote this code
  const [secondsTillMidnight, setSecondsTillMidnight] = useState(0); 

  const now = new Date();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0
      );
      setSecondsTillMidnight((midnight.getTime() - now.getTime()) / 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  // The days between the startDate and now
  const days = Math.floor(
    (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const selectedAnswer = painting_data[days % painting_data.length];
  const answerLabel = getValueFromPainting(selectedAnswer);

  console.log({ answer: answerLabel });

  const shuffledResults = [...painting_data];
  for (let i = shuffledResults.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledResults[i], shuffledResults[j]] = [
      shuffledResults[j],
      shuffledResults[i],
    ];
  }

  useEffect(() => {
    const fetchImage = async () => {
      const response = await import(
        `./assets/images/${selectedAnswer.filename}`
      );
      setImage(response.default);
    };

    fetchImage();
  }, [selectedAnswer.filename]);

  const onSubmitGuess = () => {
    setNumOfGuesses(numOfGuesses + 1);

    if (currentGuess === answerLabel) {
      setShowResultsModal(true);
      setIsWin(true);
    } else {
      setCurrentGuess("");
    }
  };

  return (
    <div className="App">
      <Header />
      <div ref={containerRef} className="ImageContainer">
        {image && image != "" ? (
          <PaintingOfTheDay
            imageUrl={image}
            containerRef={containerRef}
            clickedTileIndexes={clickedTileIndexes}
            setClickedTileIndexes={setClickedTileIndexes}
          />
        ) : null}
      </div>
      <GuessBox
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        onSubmitGuess={onSubmitGuess}
        options={shuffledResults.map((answer) => ({
          value: getValueFromPainting(answer),
          artist: answer.attribution,
          name: answer.title,
          date: answer.displaydate,
        }))}
        needsToClickAnotherTile={numOfGuesses === clickedTileIndexes.length}
        openedAllTiles={clickedTileIndexes.length === 16}
        onGiveUp={() => {
          setShowResultsModal(true);
          setIsWin(false);
        }}
      />
      <ResultsModal
        isOpen={showResultsModal}
        onClose={() => setShowResultsModal(false)}
        isWin={isWin}
        correctAnswer={selectedAnswer}
        secondsTillMidnight={secondsTillMidnight}
        clickedTileIndexes={clickedTileIndexes}
      />
    </div>
  );
}

export default App;
