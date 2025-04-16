import { useEffect, useState } from "react";
import { Answer } from "../types";

type UseSetImageProps = {
  selectedAnswer: Answer;
};

export const useSetImage = ({ selectedAnswer }: UseSetImageProps) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    // What it's giving: https://darya-ver.github.io/public/images/image_0011.webp
    //                   https://darya-ver.github.io/images/image_0011.webp
    // What it needs:    https://darya-ver.github.io/Paintle2/images/image_0000.webp
    const fetchImage = async () => {
      const response = await import(
        /* @vite-ignore */
        `/Paintle2/images/${selectedAnswer.filename}`
      );
      setImage(response.default);
    };

    fetchImage();
  }, [selectedAnswer.filename]);

  return { image };
};
