import { useEffect, useRef, useState } from "react";

type PaintingOfTheDayProps = {
  paintingOfTheDay: string;
};

type Row = {
  children: Part[];
};

type Part = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const NUMBER_OF_ROWS = 4;
const NUMBER_OF_COLS = 4;
const PART_WIDTH_PERCENT = 100 / NUMBER_OF_COLS;
const PART_HEIGHT_PERCENT = 100 / NUMBER_OF_ROWS;

export const PaintingOfTheDay = ({
  paintingOfTheDay,
}: PaintingOfTheDayProps) => {
  // divide the paintingOfTheDay into 16 equal parts
  const paintingOfTheDayParts: Row[] = [];
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    for (let j = 0; j < NUMBER_OF_COLS; j++) {
      const left = j * PART_WIDTH_PERCENT;
      const top = i * PART_HEIGHT_PERCENT;
      const width = PART_WIDTH_PERCENT;
      const height = PART_HEIGHT_PERCENT;

      const part: Part = {
        left,
        top,
        width,
        height,
      };
      if (!paintingOfTheDayParts[i]) {
        paintingOfTheDayParts[i] = { children: [] };
      }
      paintingOfTheDayParts[i].children.push(part);
    }
  }

  return (
    <div className="paintings">
      <h2>Paintings</h2>
      <div className="PaintingOfTheDay">
        {/* <img src={paintingOfTheDay} alt="Painting of the Day" width={"100%"} /> */}
        <div className="PaintingOfTheDayParts">
          {paintingOfTheDayParts.map((row, rowIndex) => (
            <div key={rowIndex} className="PaintingPartRow">
              {row.children.map((part, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="PaintingOfTheDayPart"
                  style={{
                    backgroundImage: `url(${paintingOfTheDay})`,
                    backgroundPosition: `${part.left}% ${part.top}%`,
                    width: `${part.width}%`,
                    height: `${part.height}%`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// type SplitImageProps = {
//   imageUrl: string;
// };

export const SplitImage = ({ imageUrl }: { imageUrl: string }) => {
  const [imageParts, setImageParts] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Type the ref here

  console.log({ imageParts, canvasRef });

  useEffect(() => {
    console.log("useEffect called");
    const loadImage = () => {
      console.log("loadImage called");
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        // Get the canvas context to draw on
        const canvas = canvasRef.current;

        // Make sure the canvas is not null
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        // Make sure the context is available
        if (!ctx) return;

        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;

        // Create an array to store the parts of the image
        const parts: string[] = [];
        const rows = 4; // 4 rows for splitting (16 parts total)
        const cols = 4; // 4 columns for splitting (16 parts total)
        const partWidth = img.width / cols;
        const partHeight = img.height / rows;

        // Slice the image into 16 parts
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * partWidth;
            const y = row * partHeight;
            ctx.drawImage(
              img,
              x,
              y,
              partWidth,
              partHeight,
              0,
              0,
              canvas.width,
              canvas.height
            );
            const partDataUrl = canvas.toDataURL("image/png");
            parts.push(partDataUrl); // Store each part as a Data URL
          }
        }
        setImageParts(parts); // Update the state with the parts
      };
    };

    loadImage();
  }, [imageUrl]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          width: "100%", // make the grid take full width of its container
          maxWidth: "90%", // optional: limit how wide it can get overall
          margin: "0 auto", // optional: center it
        }}
        className="SplitImage"
      >
        {imageParts.map((part, index) => (
          <img
            key={index}
            src={part}
            alt={`part-${index}`}
            style={{ width: "100%", height: "auto" }}
          />
        ))}
      </div>
    </>
  );
};
