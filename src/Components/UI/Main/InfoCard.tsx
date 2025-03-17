import { useData } from "../../../Context/ContextProvider";
import data from "../../../Data/InfoCardData";

function InfoCard() {
  const { theme, position } = useData();

  // Map themes to invert classes for cleaner code
  const invertMap: Record<string, string> = {
    dark: "invert-75",
    light: "invert-0",
    other: "invert-95",
  };

  // Select the appropriate class
  const invert = invertMap[theme] || "invert-95";

  // Fallback if data.sections is undefined or position is out of bounds
  const section =
    data?.sections?.[position] || { title: "Unknown", description: "No data available." };

  return (
    <div className="fixed w-9/10 lg:w-80 xl:w-92 2xl:w-md pl-2 md:pl-16 xl:h-110 bottom-0 pb-25 bg-gradient z-5">
      <div className={`text-base md:text-xl xl:text-3xl m-4 lobster ${invert}`}>
        {section.title}
      </div>
      <div className={`px-2 text-sm md:text-base xl:text-lg m-4 ${invert}`}>
        {section.description}
      </div>
    </div>
  );
}

export default InfoCard;
