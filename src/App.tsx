import { useRef } from "react";
import "./App.css";
import { GuessBox } from "./Components/GuessBox";
import { Header } from "./Components/Header";
import { PaintingOfTheDay } from "./Components/PaintingOfTheDay";
import painting from "./assets/babs.webp";

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Header />
      <div
        ref={containerRef}
        style={{
          flexGrow: 1,
          width: "100%",
        }}
      >
        <PaintingOfTheDay imageUrl={painting} containerRef={containerRef} />
      </div>
      <GuessBox />
    </div>
  );
}

export default App;
