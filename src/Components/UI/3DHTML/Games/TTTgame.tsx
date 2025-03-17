import { ImCross } from "react-icons/im";
import { FaCircleDot } from "react-icons/fa6";
import { MdOutlineRestartAlt } from "react-icons/md";
import { useEffect, useState } from "react";
import { Info, Score } from "../../../../Types/types";
import TTTdata, { winPatterns } from "../../../../Data/TTTdata";

// Component to render a symbol based on the game state
function Symbol({ id, condition }: Info) {
  return condition === -1 ? id : !condition ? <FaCircleDot /> : <ImCross />;
}

function TTTgame({
  score,
  setScore,
}: {
  score: Score;
  setScore: (score: Score) => void;
}) {
  const [turn, setTurn] = useState(true); // true -> Player's turn, false -> AI's turn
  const [Info, setInfo] = useState<Info[]>(TTTdata); // Stores the game board state
  const [winner, setWinner] = useState<string | null>(null);

  // Function to restart the game
  const handleRestart = () => {
    setInfo(TTTdata);
    setTurn(true);
    setWinner(null);
  };

  // Function to handle user clicks on the board
  const handleClick = (index: number) => {
    if (Info[index].condition !== -1 || !turn || winner) return;

    setInfo((prevInfo) =>
      prevInfo.map((item, i) =>
        i === index ? { ...item, condition: 1 } : item
      )
    );
    setTurn(false);
  };

  // AI makes a move after the user
  useEffect(() => {
    if (!turn && !winner) {
      const aiMove = aiAlgo(Info);
      if (aiMove !== -1) {
        setTimeout(() => {
          setInfo((prevInfo) =>
            prevInfo.map((item, i) =>
              i === aiMove ? { ...item, condition: 0 } : item
            )
          );
          setTurn(true);
        }, 500);
      }
    }
  }, [turn]);

  // Check for a winner after each move
  useEffect(() => {
    const result = checkWinner(Info);
    if (result) {
      setWinner(result);
      return;
    }
  }, [turn]);

  // Function to check the winner
  function checkWinner(board: Info[]): string | null {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;

      if (
        board[a].condition !== -1 && // Ensuring it's not an empty space
        board[a].condition === board[b].condition &&
        board[b].condition === board[c].condition &&
        !winner
      ) {
        board[a].condition
          ? setScore({ x: score.x + 1, y: score.y })
          : setScore({ x: score.x, y: score.y + 1 });
        return board[a].condition ? "You Won!" : "AI Wins!"; // Determine the winner
      }
    }

    // Check for a draw
    if (board.every((cell) => cell.condition !== -1)) {
      return "It's a Draw!";
    }

    return null; // No winner yet
  }

  // AI algorithm to determine the best move
  function aiAlgo(board: Info[]) {
    // Check the first user move
    const userMoves = board
      .filter((cell) => cell.condition === 1)
      .map((cell) => cell.id - 1);

    if (userMoves.length === 1) {
      const firstMove = userMoves[0] as 0 | 2 | 6 | 8; // Explicitly defining the type
      const responseMoves: Record<0 | 2 | 6 | 8, number> = {
        0: 8,
        2: 6,
        6: 2,
        8: 0,
      };

      if (firstMove in responseMoves) {
        return responseMoves[firstMove];
      }
    }

    // Check if a player is one move away from winning
    function findWinningMove(player: number) {
      for (let pattern of winPatterns) {
        let values = pattern.map((i) => board[i].condition);
        let count = values.filter((v) => v === player).length;
        let emptyIndex = values.indexOf(-1);
        if (count === 2 && emptyIndex !== -1) {
          return pattern[emptyIndex];
        }
      }
      return -1;
    }

    // AI winning move
    let move = findWinningMove(0);
    if (move !== -1) return move;

    // Block the user's winning move
    move = findWinningMove(1);
    if (move !== -1) return move;

    // Take the center if available
    if (board[4].condition === -1) return 4;

    // Take a corner if available
    const corners = [0, 2, 6, 8];
    for (let corner of corners) {
      if (board[corner].condition === -1) return corner;
    }

    // Take a side if available
    const sides = [1, 3, 5, 7];
    for (let side of sides) {
      if (board[side].condition === -1) return side;
    }

    return -1; // No move left
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 grid-rows-3">
        {Info.map((cell, index) => (
          <div
            key={index}
            className={`h-24 w-24 flex justify-center items-center
              ${(index + 1) % 3 ? "border-r-8" : null} ${
              index < 6 ? "border-b-8" : null
            }`}
            onClick={() => handleClick(index)}
          >
            <div className="h-20 w-20 flex items-center justify-center hover:bg-white/40 bg-white/20 text-5xl cursor-pointer rounded-2xl">
              <Symbol {...cell} />
            </div>
          </div>
        ))}
      </div>
      <div className="text-2xl font-bold text-white px-4 py-2 rounded-2xl bg-white/20 border-2 min-w-48 text-center">
        {winner}
        {!winner ? (turn ? "Your Turn" : "AI's Turn") : null}
      </div>
      <button
        className="bg-white/40 border-2 border-white rounded-xl p-2 text-2xl cursor-pointer hover:bg-white/50 fixed right-4/5 md:right-24 top-1/2"
        onClick={handleRestart}
      >
        <MdOutlineRestartAlt />
      </button>
    </div>
  );
}

export default TTTgame;
