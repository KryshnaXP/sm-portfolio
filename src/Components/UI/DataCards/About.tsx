import aboutData from "../../../Data/AboutData";

/**
 * About Component
 * - Displays a list of personal details or highlights.
 * - Uses a responsive grid layout.
 * - Dynamically renders icons and background colors from `aboutData`.
 */

export default function About() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full px-4">
      {aboutData.map((item, index) => {
        const Icon = item.icon; // Extract the icon component from the data

        return (
          <div
            key={index}
            className={`border-2 flex items-center gap-4 py-4 px-5.5 rounded-2xl shadow-md hover:scale-105 transition-all mt-2 ${item.bg}`}
          >
            {/* Icon Representation */}
            <Icon className="text-xl xl:text-3xl text-black" />

            {/* Text Content */}
            <div className="w-11/12">
              <span className="block text-base 2xl:text-lg font-bold">
                {item.title}
              </span>
              <span className="text-xs 2xl:text-sm text-gray-700">
                {item.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
