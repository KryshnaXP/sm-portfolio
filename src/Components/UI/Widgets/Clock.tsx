import { useState, useEffect } from "react";

/**
 * Points Component
 * - Renders 12 circular markers on the clock face.
 * - Larger markers are placed at 3, 6, 9, and 12 positions for clarity.
 */
function Points() {
  const points = Array.from({ length: 12 }, (_, i) => i); // 12 points, each 30° apart

  return (
    <>
      {points.map((angle, index) => (
        <div
          key={index}
          className="fixed z-3"
          style={{ transform: `rotate(${angle * 30}deg)` }} // Rotating each marker
        >
          <div
            className={`bg-teal-600/65 w-3 h-3 rounded-full translate-x-30 ${
              angle % 3 === 0 ? "scale-150" : "" // Enlarging markers at 3, 6, 9, and 12
            }`}
          ></div>
        </div>
      ))}
    </>
  );
}

/**
 * Clock Component
 * - Displays an analog clock with animated hour, minute, and second hands.
 * - Shows the current time and date below the clock.
 */
function Clock() {
  const [time, setTime] = useState(new Date());

  // Update the clock every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Extract hours, minutes, and seconds
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const currentDate = time.getDate();

  // Month names for display
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[time.getMonth()];

  // Day names for display
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = dayNames[time.getDay()];

  return (
    <div className="bg-re-500 w-91.5 h-101 flex flex-col items-center text-white font-semibold">
      {/* Clock Face */}
      <div className="bg-quat rounded-full w-4/5 h-4/5 relative flex justify-center items-center -rotate-90 overflow-clip border-6 border-white/70 drop-shadow-[0_0px_20px_rgba(15,140,140,1)]">
        
        {/* Hour Hand */}
        <div
          className="fixed z-1"
          style={{ transform: `rotate(${hours * 30}deg)` }}
        >
          <div className="bg-perlin-teal w-20 h-4 translate-x-10 rounded-tr-4xl rounded-br-xl brightness-70"></div>
        </div>

        {/* Minute Hand */}
        <div
          className="fixed z-1"
          style={{ transform: `rotate(${minutes * 6}deg)` }}
        >
          <div className="bg-perlin-teal w-24 h-3 translate-x-12 rounded-tr-xl rounded-br-2xl brightness-100"></div>
        </div>

        {/* Second Hand */}
        <div
          className="fixed z-1"
          style={{ transform: `rotate(${seconds * 6}deg)` }}
        >
          <div className="bg-perlin-teal w-28 h-2 translate-x-14 rounded-tr-xl rounded-br-4xl brightness-130"></div>
        </div>

        {/* Center Dot */}
        <div className="bg-perlin-teal w-6 h-6 rounded-full z-2"></div>

        {/* Clock Face Background Overlay */}
        <div className="bg-perlin-teal opacity-50 w-full h-full fixed translate-y-33"></div>

        {/* Clock Markers */}
        <Points />
      </div>

      {/* Digital Time Display */}
      <div className="text-3xl mt-4 pt-4 flex gap-2 italic bg-teal-700/50 min-w-60 justify-center rounded-t-2xl">
        <span>{hours % 12 || 12}</span>:
        <span>{minutes.toString().padStart(2, "0")}</span>:
        <span>{seconds.toString().padStart(2, "0")}</span>
      </div>

      {/* Date Display */}
      <div className="text-xl py-2 flex gap-2 italic bg-teal-700/50 min-w-60 justify-center rounded-b-2xl">
        <span>{day},</span>
        <span>{currentDate}</span>
        <span>{month}</span>
      </div>
    </div>
  );
}

export default Clock;
