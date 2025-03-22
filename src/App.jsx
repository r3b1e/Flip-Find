import { useEffect, useState } from "react";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";
import axios from "axios";
import { AssistiveTechInfo } from "./components/AssistiveTechInfo";
import GameOver from "./components/GameOver";
import { ErrorCard } from "./components/ErrorCard";

export default function App() {

  const initialFormData = {
    category: "animals-and-nature",
    count: 12,
  }
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setemojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    category: "animals-and-nature",
    number: 10,
  });
  const [isFirstRender, setIsFirstRender] = useState(true);  

  console.log(formData.number)
  const Random = (len) => {
    return Math.floor(Math.random() * len);
  };

  const Suffle = (arr) => {
    let size = arr.length - 1;
    for (let i = size; i > 0; i--) {
      const j = Random(i);
      // [arr[i], arr[j]] = [arr[j], arr[i]]
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  async function startGame(e) {
    e.preventDefault();

    try {
      // throw new Error('I am now throwing new brandn new an error');

      const response = await fetch(
        `https://emojihub.yurace.pro/api/all/category/${formData.category}`
      );

      

      if (!response.ok) {
        throw new Error("Faile to Fetch the data");
      }

      const data = await response.json();

      
      // setIsFirstRender(false)

      const RandomData = [];
      const RandomNum = [];
      var len = data.length;

      for (var i = 0; i < (formData.number / 2); i++) {
        const num = Random(len);
        if (!RandomNum.includes(num)) {
          RandomNum.push(num);
          RandomData.push(data[num]);
        } else {
          i--;
        }
      }
      console.log(RandomData);
      const SuffleSet = Suffle([...RandomData, ...RandomData]);
      console.log(RandomData);
      setemojisData(SuffleSet);
      setIsGameOn(true);
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
    finally {
      setIsFirstRender(false)

    }
  }

  function turnCard(id, name, index) {
    // const selectedCardEntry = selectedCards.find(
    //   (emoji) => emoji.index === index
    // );

    if (selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { id, name, index },
      ]);
    } else if (selectedCards.length === 2) {
      setSelectedCards([{ id, name, index }]);
    }
  }

  const resetGame = () => {
    console.log("Resetting game...");
    setIsGameOver(false);
    setSelectedCards([]);
    setMatchedCards([]);
  };

  const playAgain = () => {
    setIsGameOn(false);
    resetGame();
    startGame();
  };

  useEffect(() => {
    if (
      selectedCards.length === 2 &&
      selectedCards[0].name === selectedCards[1].name
    ) {
      setMatchedCards((prevMatchedCards) => [
        ...prevMatchedCards,
        ...selectedCards,
      ]);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (emojisData.length && matchedCards.length === emojisData.length) {
      setIsGameOver(true);
      console.log("Game Over");
      handleGameEnd();
      //-------

    }
  }, [matchedCards]);

  console.log(selectedCards);
  console.log(matchedCards);

  const resetError = () => {
    setIsError(false);
  };

  function handleFormChange(e) {
    console.log(`${e.target.name}: ${e.target.value}`)
    
      setFormData((prev)=>({...prev, [e.target.name]:e.target.value}))
    
}

//------------Mobile View------------------------
const [deferredPrompt, setDeferredPrompt] = useState(null);
const [gamePlayed, setGamePlayed] = useState(false);

useEffect(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent default to stop auto prompt
    e.preventDefault();
    setDeferredPrompt(e);
  });
}, []);

// Detect if the user is on mobile
const isMobile = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

// Call this when the game ends
const handleGameEnd = () => {
  setGamePlayed(true);

  if (deferredPrompt && isMobile()) {
    setTimeout(() => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted to add the app to home screen');
        } else {
          console.log('User dismissed the app install prompt');
        }
        setDeferredPrompt(null);
      });
    }, 2000); // Delay by 2 seconds after game ends
  }
};



//------------Mobile View------------------------


  return (
    <main>
      <h1>Flip & Find</h1>
      {!isGameOn && <Form handleSubmit={startGame} handleChange={handleFormChange} isRender={isFirstRender} />}

      {isGameOn && !isGameOver && (
        <AssistiveTechInfo
          emojisData={emojisData}
          matchedCards={matchedCards}
        />
      )}
      {isGameOver && <GameOver reset={resetGame} play={playAgain} />}
      {!isError ? (
        isGameOn && (
          <MemoryCard
            handleClick={turnCard}
            data={emojisData}
            selectedCards={selectedCards}
            matchedCards={matchedCards}
          />
        )
      ) : (
        <ErrorCard handleSubmit={resetError} />
      )}
    </main>
  );
}
