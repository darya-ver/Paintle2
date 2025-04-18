import { useEffect, useState, useLayoutEffect, useRef } from "react";

type Part = {
  dimensions: { width: number; height: number };
  src: string;
};

type PaintingOfTheDayProps = {
  imageUrl: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  clickedTileIndexes: number[];
  setClickedTileIndexes: React.Dispatch<React.SetStateAction<number[]>>;
};

export const PaintingOfTheDay = ({
  imageUrl,
  containerRef,
  clickedTileIndexes,
  setClickedTileIndexes,
}: PaintingOfTheDayProps) => {
  const [imageParts, setImageParts] = useState<Part[]>([]);

  const [imageScaledDimensions, setImageScaledDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const [windowWidth, windowHeight] = useWindowSize();

  useEffect(() => {
    const loadImage = () => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const container = containerRef.current;

        if (!container) return;

        const numColsToCut = 4;
        const numRowsToCut = 4;

        const ratioWidth = img.width / container.clientWidth;
        const ratioHeight = img.height / container.clientHeight;

        const ratio = Math.max(ratioWidth, ratioHeight, 1);

        setImageScaledDimensions({
          width: img.width / ratio,
          height: img.height / ratio,
        });

        const imagePieces: Part[] = [];

        const widthOfOnePiece = Math.floor(img.width / numColsToCut);
        const heightOfOnePiece = Math.floor(img.height / numRowsToCut);

        for (let y = 0; y < numRowsToCut; ++y) {
          for (let x = 0; x < numColsToCut; ++x) {
            const canvas = document.createElement("canvas");
            canvas.width = widthOfOnePiece / ratio;
            canvas.height = heightOfOnePiece / ratio;
            const context = canvas.getContext("2d");
            if (!context) return;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
              img,
              x * widthOfOnePiece,
              y * heightOfOnePiece,
              widthOfOnePiece,
              heightOfOnePiece,
              0,
              0,
              canvas.width,
              canvas.height
            );
            imagePieces.push({
              dimensions: { width: canvas.width, height: canvas.height },
              src: canvas.toDataURL(),
            });
          }
        }

        setImageParts(imagePieces); // Update the state with the parts
      };
    };

    loadImage();
  }, [containerRef, imageUrl, windowWidth, windowHeight]);

  const refs = useRef<HTMLDivElement[]>([]);

  const duration = 10;
  useEffect(() => {
    refs.current.forEach((ref, index) => {
      if (!ref) return;

      const rowColTotal = (index % 4) + Math.floor(index / 4);
      const totalColors = 6;
      const startingOffset = Math.floor(
        ((rowColTotal % totalColors) / totalColors) * duration
      );
      ref.style.animationDuration = `${duration}s`;
      ref.style.animationDelay = `-${startingOffset}s`;
    });
  }, [imageParts]);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
        className="ImageContainer"
        ref={containerRef}
      >
        <canvas style={{ display: "none" }} />
        <div
          style={{
            position: "relative",
            width: imageScaledDimensions.width + 1,
            height: imageScaledDimensions.height,
            fontSize: "0px",
          }}
        >
          {imageParts.map(({ src, dimensions }, index) => (
            <div
              ref={(el) => {
                if (el) refs.current[index] = el;
              }}
              className="greenCycle"
              style={{
                display: "inline-block",
                width: dimensions.width,
                height: dimensions.height,
              }}
              onClick={() => {
                setClickedTileIndexes((prev) => {
                  if (!prev.includes(index)) {
                    return [...prev, index];
                  }
                  return prev;
                });
              }}
            >
              {clickedTileIndexes.includes(index) && (
                <img
                  key={index}
                  src={clickedTileIndexes.includes(index) ? src : ""} // Show the image part only if guessed
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
