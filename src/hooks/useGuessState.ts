import { useState } from "react";

type UseGuessStateProps = {
  answerLabel: string;
};

export const useGuessState = ({ answerLabel }: UseGuessStateProps) => {
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [numOfGuesses, setNumOfGuesses] = useState<number>(0);
  const [showResultsModal, setShowResultsModal] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean>(false);

  const onSubmitGuess = () => {
    setNumOfGuesses(numOfGuesses + 1);

    if (currentGuess === answerLabel) {
      setShowResultsModal(true);
      setIsWin(true);
    } else {
      setCurrentGuess("");
    }
  };

  const onGiveUp = () => {
    setIsWin(false);
    setShowResultsModal(true);
  };

  const onCloseModal = () => {
    setShowResultsModal(false);
    setCurrentGuess("");
  };

  return {
    currentGuess,
    setCurrentGuess,
    numOfGuesses,
    showResultsModal,
    isWin,
    onSubmitGuess,
    onGiveUp,
    onCloseModal,
  };
};
