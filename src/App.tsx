import "./App.css";
import { GuessBox } from "./Components/GuessBox";
import { Header } from "./Components/Header";
import { SplitImage } from "./Components/PaintingOfTheDay";
import painting from "./assets/babs.webp";

function App() {
  // const todaysPainting = "./assets/babs.webp";

  return (
    <>
      <Header />
      {/* <PaintingOfTheDay paintingOfTheDay={painting} /> */}
      <SplitImage imageUrl={painting} />
      <GuessBox />
    </>
  );
}

export default App;

/*

current folder structure:

src
├── App.tsx
├── Components
│   ├── PaintingOfTheDay.tsx
├── assets
│   ├── babs.webp


*/
