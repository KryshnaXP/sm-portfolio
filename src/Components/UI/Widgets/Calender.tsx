import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../../Styles/global.css"; // Import global styles

/**
 * MyCalendar Component
 * A simple calendar component using the 'react-calendar' package.
 */
function MyCalendar() {
  // State to manage the selected date
  const [date, setDate] = useState<Date | null>(new Date());

  /**
   * Handles date selection changes in the calendar.
   * Ensures that the selected value is a valid Date object.
   */
  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Date) {
      setDate(value[0]); // Handle range selection (if enabled)
    }
  };

  return (
    <div className="flex justify-center items-center border-8 border-white/90 rounded-2xl drop-shadow-[0_0px_20px_rgba(15,140,140,1)]">
      {/* Calendar Component */}
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
}

export default MyCalendar;


