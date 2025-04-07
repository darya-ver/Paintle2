import { useEffect, useState } from "react";

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
  }, [containerRef, imageUrl]);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "500px",
        }}
        ref={containerRef}
      >
        <canvas style={{ display: "none" }} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0px",
            width: imageScaledDimensions.width,
            height: imageScaledDimensions.height,
            border: "none",
            borderWidth: "0px",
            padding: 0,
            margin: 0,
          }}
        >
          {imageParts.map(({ src, dimensions }, index) => (
            <img
              key={index}
              src={clickedTileIndexes.includes(index) ? src : ""} // Show the image part only if guessed
              style={{
                display: "block",
                width: dimensions.width,
                height: dimensions.height,
                backgroundColor: clickedTileIndexes.includes(index)
                  ? "transparent"
                  : "green",
                cursor: "pointer",
                border: "none",
                borderWidth: "0px",
                padding: 0,
                margin: 0,
              }}
              onClick={() => {
                setClickedTileIndexes((prev) => {
                  if (!prev.includes(index)) {
                    return [...prev, index];
                  }
                  return prev;
                });
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};
