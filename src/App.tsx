import { useRef } from "react";
import "./App.css";
import { GuessBox } from "./Components/GuessBox";
import { Header } from "./Components/Header";
import { PaintingOfTheDay } from "./Components/PaintingOfTheDay";
import painting_data from './assets/final_image_data.json'
import { useEffect, useState } from 'react'


function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const startDate = new Date(2025, 3, 6) // day that we wrote this code
  const now = new Date()

  // The days between the startDate and now
  const days = Math.floor(
    (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  const selectedAnswer = painting_data[days % painting_data.length]

  const shuffledAnswers = [...painting_data]
  for (let i = shuffledAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledAnswers[i], shuffledAnswers[j]] = [
        shuffledAnswers[j],
        shuffledAnswers[i],
      ]
  }

  const [image, setImage] = useState(null)


  useEffect(() => {
    const fetchImage = async () => {
      const response = await import(`./assets/images/${selectedAnswer.filename}`) // change relative path to suit your needs
      setImage(response.default)
    }

    fetchImage()
  }, [selectedAnswer.filename])

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
        {image != "" ?
          <PaintingOfTheDay imageUrl={image} containerRef={containerRef} /> : null
        }
      </div>
      <GuessBox />
    </div>
  );
}

export default App;
