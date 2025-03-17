import { useEffect, useRef } from "react";
import { useData } from "../../../Context/ContextProvider";
import gsap from "gsap";

// Overview placeholder text when no game is selected
const OverView = () => (
  <div className="text-xl italic">Start a Game by Clicking on it</div>
);

// Tic-Tac-Toe grid
const TTT = () => (
  <div className="grid grid-cols-3 grid-rows-3 w-1/2 text-center">
    {[...Array(9)].map((_, i) => (
      <div
        key={i}
        className={`${i < 6 && "border-b-2"} ${i % 3 !== 2 && "border-r-2"}`}
      >
        {i + 1}
      </div>
    ))}
  </div>
);

// Rock-Paper-Scissors selection
const RPS = () => {
  const choices = ["ROCK", "PAPER", "SCISSORS"];
  return choices.map((choice, i) => (
    <div key={i} className="flex flex-col items-center">
      <div className="rounded-lg h-8 w-8 bg-black/30 border flex justify-center items-center mb-4">
        {i + 1}
      </div>
      {choice}
    </div>
  ));
};

// Bottom bar component containing games and score display
function Bottombar() {
  const { games, score, position } = useData();
  const barRef = useRef(null);

  // Animate bottom bar visibility based on position state
  useEffect(() => {
    if (barRef.current) {
      const tween = gsap.to(barRef.current, {
        y: position === 1 ? "0%" : "100%",
        opacity: position === 1 ? 1 : 0,
        duration: position === 1 ? 2 : 0.3,
        ease: "power2.out",
      });

      return () => {
        tween.kill(); // Kill the animation when effect re-runs or unmounts
      };
    }
  }, [position]);

  return (
    <div
      ref={barRef}
      className="hidden md:block fixed bg-tert h-36 m-2 left-7/20 w-7/20 bottom-0 rounded-xl border-2 border-gray-300 text-white z-10"
    >
      <div className="flex h-5/6">
        {/* Game display section */}
        <div className="w-3/4 flex justify-evenly items-center gap-6">
          {games === 0 ? <OverView /> : games === 1 ? <RPS /> : <TTT />}
        </div>
        {/* Score display section */}
        <div className="w-1/4 flex justify-center items-center">
          {["User", "AI"].map((player, i) => (
            <div key={i} className="w-20 h-20 text-center">
              <div className="text-xs font-bold italic">{player}</div>
              <div className="bg-white/30 m-3 h-12 w-12 rounded-2xl border-2 flex justify-center items-center">
                {i === 0 ? score.x : score.y}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Performance warning */}
      <p className="h-1/6 flex items-center justify-center italic font-light text-xs">
        *The animation is highly GPU-intensive, which may result in performance
        lag.
      </p>
    </div>
  );
}

export default Bottombar;
