import { Html } from "@react-three/drei";
import RPSIcon from "../../../Assets/RPS";
import { TbTicTac } from "react-icons/tb";
import { TiArrowBack } from "react-icons/ti";
import { useData } from "../../../Context/ContextProvider";
import RPSgame from "./Games/RPSgame";
import TTTgame from "./Games/TTTgame";

/**
 * TVScreen Component
 * - Displays a TV-like UI inside a 3D environment.
 * - Allows users to play **Rock-Paper-Scissors** and **Tic-Tac-Toe**.
 * - Uses `@react-three/drei`'s `Html` to render UI within the 3D scene.
 *
 * @param {Object} props - Component properties.
 * @param {number} props.opacity - Controls the visibility of the TV screen and UI elements.
 * @returns {JSX.Element} - A TV UI inside the 3D world.
 */
function TVScreen({ opacity }: { opacity: number }) {
  const { setGames, games, score, setScore } = useData(); // Access global game state and score

  return (
    <Html
      transform
      position={[-0.5, 2.08, -0.015]}
      rotation={[0, Math.PI / 2, 0]}
      distanceFactor={2}
      className={opacity === 0 ? "hidden" : "block"}
    >
      {/* TV Container */}
      <div
        className="h-139 w-193 transition-opacity rounded-3xl relative"
        style={{
          opacity,
          pointerEvents: opacity === 0 ? "none" : "auto", // Disable interaction when hidden
        }}
      >
        {/* Back Button (Visible when a game is selected) */}
        {games !== 0 && (
          <div
            className="fixed text-6xl right-6/7 md:right-8 top-8 invert-100 cursor-pointer z-21"
            onClick={() => setGames(0)}
          >
            <TiArrowBack />
          </div>
        )}
        
        {/* Game Selection Screen & Active Games */}
        <div className="h-full w-full text-white z-20 fixed top-0">
          {/* Header Section */}
          <div className="h-32 mt-8 text-center text-6xl lobster">
            {games === 0 ? "Games" : games === 1 ? "Rock-Paper-Scissors" : "Tic-Tac-Toe"}
            <p className="coustard font-normal text-xl h-18 flex items-center justify-center">
              {games === 0 && "Select a game to Start"}
            </p>
          </div>
          
          {/* Game Selection Menu */}
          {games === 0 && (
            <>
              {/* Rock-Paper-Scissors Button */}
              <div
                className="w-3/4 h-28 mx-auto rounded-2xl mb-12 mt-8 bg-white/20 hover:bg-white/25 cursor-pointer flex items-center gap-16 border-2 p-4"
                onClick={() => setGames(1)}
              >
                <RPSIcon />
                <p className="text-3xl">Rock-Paper-Scissors</p>
              </div>
              
              {/* Tic-Tac-Toe Button */}
              <div
                className="w-3/4 h-28 mx-auto rounded-2xl mb-12 mt-8 bg-white/20 hover:bg-white/25 cursor-pointer flex items-center gap-16 border-2 p-4"
                onClick={() => setGames(2)}
              >
                <TbTicTac className="text-6xl" />
                <p className="text-3xl">Tic-Tac-Toe</p>
              </div>
            </>
          )}
          
          {/* Game Screens */}
          {games === 1 && <RPSgame score={score} setScore={setScore} />} {/* Rock-Paper-Scissors */}
          {games === 2 && <TTTgame score={score} setScore={setScore} />} {/* Tic-Tac-Toe */}
        </div>
      </div>
    </Html>
  );
}

export default TVScreen;
