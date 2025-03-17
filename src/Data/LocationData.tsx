import { FaMapMarkerAlt, FaUniversity, FaBuilding, FaClock } from "react-icons/fa";

// Read values from environment variables
const birthYear = parseInt(import.meta.env.VITE_BIRTH_YEAR, 10);
const birthMonth = parseInt(import.meta.env.VITE_BIRTH_MONTH, 10) - 1; // JS months are 0-based
const birthDate = parseInt(import.meta.env.VITE_BIRTH_DATE, 10);

const DOB = new Date(birthYear, birthMonth, birthDate);
const today = new Date();

// Calculate age in years
let ageYears = today.getFullYear() - DOB.getFullYear();

// Adjust the age if the birthday hasn't occurred yet this year
if (
  today.getMonth() < DOB.getMonth() ||
  (today.getMonth() === DOB.getMonth() && today.getDate() < DOB.getDate())
) {
  ageYears--;
}

const locations = [
  {
    title: "Hometown",
    value: "Mumbai, India",
    icon: FaBuilding,
  },
  {
    title: "Current Location",
    value: "IIEST, Kolkata, India",
    icon: FaUniversity,
  },
  {
    title: "Years in Mumbai",
    value: "Lived for 17-18 years",
    icon: FaClock,
  },
  {
    title: "Age",
    value: `${ageYears} Years`,
    icon: FaMapMarkerAlt,
  },
];

export default locations;
