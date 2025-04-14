import { useEffect, useState } from "react";
import { Answer } from "../types";

type UseSetImageProps = {
  selectedAnswer: Answer;
};

export const useSetImage = ({ selectedAnswer }: UseSetImageProps) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log("in useEffect useSetImage.tsx");

    const fetchImage = async () => {
      const response = await import(
        /* @vite-ignore */
        `./../assets/images/${selectedAnswer.filename}`
      );
      setImage(response.default);
    };

    fetchImage();
  }, [selectedAnswer.filename]);

  return { image };
};
