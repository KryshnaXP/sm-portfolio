import { useEffect, useState } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import { Score } from "../../../../Types/types";

// Define possible choices for Rock-Paper-Scissors
const choices = [
  { icon: <FaHandRock />, name: "Rock" },
  { icon: <FaHandPaper />, name: "Paper" },
  { icon: <FaHandScissors />, name: "Scissors" },
];

function RPSgame({
  score,
  setScore,
}: {
  score: Score;
  setScore: (score: Score) => void;
}) {
  // State variables to track game progress
  const [onGoing, setOnGoing] = useState(false); // Whether a game round is in progress
  const [selected, setSelected] = useState<number | null>(null); // User's choice
  const [aiChoice, setAiChoice] = useState<number | null>(null); // AI's choice
  const [winner, setWinner] = useState<string | null>(null); // Winner status

  useEffect(() => {
    async function AI(selected: number) {
      // Show countdown before AI selects its move
      setAiChoice(10);
      setWinner("Wait for Results !");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAiChoice(9);
      setWinner("Wait for Results !");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAiChoice(8);
      setWinner("Wait for Results !");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // AI randomly picks a move
      const aiMove = Math.floor(Math.random() * 3);
      setAiChoice(aiMove);

      // Determine Winner
      if (selected === aiMove) {
        setWinner("It's a Draw!");
      } else if (
        (selected === 0 && aiMove === 2) || // Rock beats Scissors
        (selected === 1 && aiMove === 0) || // Paper beats Rock
        (selected === 2 && aiMove === 1) // Scissors beats Paper
      ) {
        setScore({ x: score.x + 1, y: score.y }); // Increment user score
        setWinner("You Won!");
      } else {
        setScore({ x: score.x, y: score.y + 1 }); // Increment AI score
        setWinner("AI Won!");
      }

      // End the game round
      setOnGoing(false);
    }

    // Trigger AI move if user has made a selection and game is ongoing
    if (selected !== null && onGoing) {
      AI(selected);
    }
  }, [selected, onGoing]);

  // Handles user selecting a move
  const action = (index: number) => {
    setSelected(index);
    setOnGoing(true);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Display Choices (User vs AI) */}
      <div className="w-full h-32 flex justify-center gap-8">
        {/* User Choice */}
        <div className="h-32 w-32 border-2 border-white rounded-4xl bg-white/40 flex justify-center items-center text-6xl">
          {selected !== null ? choices[selected].icon : "?"}
        </div>

        <div className="h-32 w-32 flex justify-center items-center text-3xl">
          vs
        </div>

        {/* AI Choice */}
        <div className="h-32 w-32 border-2 border-white rounded-4xl bg-white/40 flex justify-center items-center text-6xl">
          {aiChoice !== null
            ? aiChoice > 3
              ? aiChoice - 7 // Countdown effect before AI makes a move
              : choices[aiChoice].icon
            : "?"}
        </div>
      </div>

      {/* Winner Display */}
      <div className="bg-white/40 w-1/2 mx-auto rounded-4xl border-2 h-12 flex justify-center items-center text-xl">
        {winner || "Choose your move!"}
      </div>

      {/* Selection Buttons */}
      <div className="w-full h-28 flex justify-center gap-20 md:gap-0 md:justify-evenly items-center text-5xl">
        {choices.map((choice, index) => (
          <div
            key={index}
            className="h-22 w-22 border-2 border-white rounded-4xl bg-white/40 hover:bg-white/65 flex justify-center items-center cursor-pointer"
            onClick={() => action(index)}
          >
            {choice.icon}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RPSgame;