import { useState, useEffect } from "react";
import { useData } from "../../../Context/ContextProvider";
import locations from "../../../Data/LocationData";

/**
 * Location Component
 * - Displays key location details including hometown, current location, and years lived.
 * - Dynamically calculates and displays the user's age.
 * - Supports dark, light, and custom themes.
 * - Uses Tailwind for styling and conditional rendering for theme-based colors.
 */

export default function Location() {
  const { theme } = useData();
  const [invert, setInvert] = useState("");

  /**
   * Effect Hook: Updates image inversion based on the selected theme.
   * - Dark theme applies full inversion.
   * - Light theme has no inversion.
   * - Custom theme applies a slight inversion.
   */
  useEffect(() => {
    setInvert(
      theme === "dark"
        ? "invert-100"
        : theme === "light"
        ? "invert-0"
        : "invert-95"
    );
  }, [theme]);

  return (
    <div className="relative w-full h-full flex">
      {/* Left Section - Displays location details */}
      <div className="fixed w-full md:w-2/3 md:h-full px-4 py-2 flex flex-col justify-center">
        <div className="bg-blue-600/20 h-full rounded-2xl p-8 flex flex-col gap-6 border-2">
          {locations.map((loc, index) => {
            const Icon = loc.icon;
            return (
              <div key={index} className="flex items-center gap-4">
                {/* Icon with theme-based color */}
                <Icon
                  className={`text-base md:text-xl xl:text-3xl ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                />
                <div>
                  <span className="block text-sm md:text-base xl:text-lg font-bold p-1">
                    {loc.title}
                  </span>
                  <span className="text-sm text-gray-700 p-2 bg-white/20 rounded-lg">
                    {loc.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Section - Displays Mumbai image */}
      <div className="fixed left-2/3 w-1/3 h-full p-2 hidden md:block">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg"
          alt="Gateway of India, Mumbai"
          className={`h-full rounded-2xl object-cover border-2 ${invert}`}
        />
      </div>
    </div>
  );
}
