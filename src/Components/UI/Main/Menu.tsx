import { useCallback } from "react";
import { useData } from "../../../Context/ContextProvider";
import { GoHomeFill } from "react-icons/go";
import { PiMonitorFill, PiCertificateFill } from "react-icons/pi";
import { IoGameController } from "react-icons/io5";

// Menu items for mapping
const menuItems = [
  { id: 0, label: "Overview", icon: <GoHomeFill /> },
  { id: 2, label: "Essence", icon: <PiMonitorFill /> },
  { id: 3, label: "Prowess", icon: <PiCertificateFill /> },
  { id: 4, label: "Creations", icon: <IoGameController /> },
];

function Menu() {
  const { position, setGames, setPosition, setView } = useData();

  // Memoized function to prevent re-renders
  const handleSwitch = useCallback(
    (id: number) => {
      setPosition(id);
      setView({ x: -1, y: "Overview" });
      setGames(0);
    },
    [setPosition, setView, setGames]
  );

  return (
    <>
      {/* Desktop Menu */}
      <div className="lobster text-xl fixed hidden md:flex md:w-36 lg:w-44 xl:w-68 h-80 top-[35%] right-0 flex-col justify-evenly text-slate-200 z-5">
        {menuItems.map(({ id, label }) => (
          <div
            key={id}
            className={`px-16 rounded-l-full h-12 flex items-center cursor-pointer transition-all duration-300 ${
              position === id
                ? "bg-perlin-teal scale-110 outline-4 outline-slate-200 brightness-110"
                : "bg-teal-500 hover:scale-105 border-2 border-slate-200 hover:bg-teal-400"
            }`}
            onClick={() => handleSwitch(id)}
            aria-label={label}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-perlin-teal w-2/3 fixed h-12 bottom-8 left-1/6 rounded-full outline-3 outline-slate-300 text-2xl flex items-center justify-evenly z-15">
        {menuItems.map(({ id, icon, label }) => (
          <div
            key={id}
            className={`invert-85 cursor-pointer transition-all duration-300 ${
              position === id
                ? "scale-110 brightness-130 rounded-full border-1 border-black p-1.5 bg-black/30"
                : "scale-90"
            }`}
            onClick={() => handleSwitch(id)}
            aria-label={label}
          >
            {icon}
          </div>
        ))}
      </div>
    </>
  );
}

export default Menu;
