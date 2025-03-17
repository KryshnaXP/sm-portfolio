import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap"; // GSAP for smooth animations
import { useData } from "../../../Context/ContextProvider";
import socialLinks from "../../../Data/ContactsData"; // Importing data (icons and URLs) from a file

/**
 * Contact Component
 * - Displays a contact section with email and social media links.
 * - Uses GSAP for smooth slide-in and slide-out animations.
 * - Adjusts styles dynamically based on theme selection.
 */
function Contact() {
  const { contact, theme, setContact } = useData(); // Context data for theme and contact visibility state
  const [invert, setInvert] = useState("invert-0"); // State for adjusting theme-based color inversion
  const contactRef = useRef<HTMLDivElement>(null); // Reference for GSAP animations

  /**
   * Handles slide-in and slide-out animations based on contact visibility.
   */
  useEffect(() => {
    if (contact) {
      gsap.to(contactRef.current, {
        y: 0, // Slide in from bottom
        duration: 0.8,
        ease: "power3.out",
      });
    } else {
      gsap.to(contactRef.current, {
        y: "100%", // Slide out to bottom
        duration: 0.8,
        ease: "power3.in",
      });
    }
  }, [contact]);

  /**
   * Adjusts color inversion based on the theme.
   */
  useEffect(() => {
    if (theme === "dark") {
      setInvert("invert-75");
    } else if (theme === "light") {
      setInvert("invert-0");
    } else {
      setInvert("invert-95");
    }
  }, [theme]);

  return (
    <div
      ref={contactRef}
      className="fixed bg-gradient-full w-screen h-screen z-7 bottom-0 translate-y-full flex items-center"
    >
      <div className={`w-full py-12 px-6 mt-16 ${invert}`}>
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 lobster">
            Do you have a project?
          </h3>

          {/* Description */}
          <p className="text-xs md:text-sm lg:text-base text-gray-700 mt-4 mb-12 mx-6 md:mx-0">
            Send an email or contact
            <strong className="text-xs md:text-sm lg:text-base font-semibold text-gray-900">
              {" "}
              KryshnaXP{" "}
            </strong>
            via the form below.
          </p>

          {/* Social Links */}
          <div className="flex flex-col gap-4 w-full items-center mb-16">
            {socialLinks.map(({ icon, label, url }, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base lg:text-lg font-medium text-gray-800 hover:underline flex items-center gap-2 md:gap-4 lg:gap-6"
              >
                <span className="text-xl lg:text-2xl">{icon}</span>
                {label}
              </a>
            ))}

            {/* Home Button */}
            <span
              className="cursor-pointer font-bold text-gray-300 bg-black py-2 px-4 rounded-2xl"
              onClick={() => setContact(false)}
            >
              Home
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
