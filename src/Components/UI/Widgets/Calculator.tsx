import { useState, useCallback } from "react";

/**
 * Evaluates a mathematical expression safely.
 * @param expression A string containing a mathematical expression.
 * @returns The evaluated result as a string or an error message.
 */
function Evaluate(expression: string): string {
  try {
    const result = new Function(`return (${expression})`)();
    if (typeof result !== "number" || isNaN(result)) return "Error";
    if (result < 10 ** 9) return result.toFixed(3);
    if (result < 10 ** 13) return result.toString();
    return "OverFlow_Error";
  } catch {
    return "Error";
  }
}

/**
 * Button component for calculator keys.
 * @param label The text displayed on the button.
 * @param onClick The function executed on button press.
 */
function Button({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <button
        className="bg-gray-200/98 w-12 h-12 cursor-pointer rounded-xl drop-shadow-[0_0px_2px_rgba(15,140,140,1)] hover:brightness-105 hover:contrast-105 hover:scale-105"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

/**
 * Calculator component with basic arithmetic functions.
 */
function Calculator() {
  const [display, setDisplay] = useState<string>("");

  // Handles button click and appends value to display
  const handleClick = useCallback((value: string) => {
    if (display.length < 13) setDisplay((prev) => prev + value);
  }, [display]);

  return (
    <div className="bg-re-500 w-91.5 h-108 flex flex-col items-center font-semibold text-black">
      <div className="bg-quat h-full w-74 rounded-2xl border-8 border-white/70 drop-shadow-[0_0px_20px_rgba(15,140,140,1)]">
        
        {/* Display Screen */}
        <div className="bg-gray-200/98 w-5/6 h-12 mx-auto mb-7 mt-5 flex items-center justify-end p-2 text-xl rounded-xl drop-shadow-[0_0px_2px_rgba(15,140,140,1)] overflow-auto">
          {display}
        </div>

        {/* Calculator Buttons */}
        <div className="grid grid-cols-4 gap-4 px-4">
          <Button label="AC" onClick={() => setDisplay("")} />
          <Button label="X" onClick={() => setDisplay(display.slice(0, -1))} />

          {/* Numeric and Operator Keys */}
          {["/", "*", "1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "%", "0", "00", "."].map((key) => (
            <Button key={key} label={key} onClick={() => handleClick(key)} />
          ))}

          <Button label="=" onClick={() => setDisplay(Evaluate(display))} />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
