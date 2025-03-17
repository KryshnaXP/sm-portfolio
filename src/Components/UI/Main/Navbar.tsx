import { IoMdColorPalette } from "react-icons/io";
import { useData } from "../../../Context/ContextProvider";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { Theme } from "../../../Types/types";

function Navbar() {
  // Context values for managing theme, menu, and contact state
  const { theme, position, contact, setTheme, setContact } = useData();
  const [menu, setMenu] = useState(false); // Menu state for theme selection
  const menuRef = useRef<HTMLDivElement>(null); // Ref for the theme menu div

  // Theme-based styles
  const themeStyles: Record<Theme, { invert: string; bg: string }> = {
    light: { invert: "invert-0", bg: "bg-[#20211f]" },
    neutral: { invert: "invert-95", bg: "bg-[#dad0dd]" },
    dark: { invert: "invert-75", bg: "bg-[#bd9ccb]" },
  };

  const { invert, bg: offBg } = themeStyles[theme] || themeStyles.light;

  // Toggle menu visibility
  const handleClick = () => setMenu((prev) => !prev);

  // Handle profile click (toggle contact panel when at position 0)
  const handleProfile = () => {
    if (position === 0) setContact(!contact);
  };

  // Change theme and update body class
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    document.body.className = newTheme;
    setMenu(false);
  };

  // GSAP animation for menu
  useEffect(() => {
    if (menu && menuRef.current) {
      gsap.killTweensOf(menuRef.current); // Kill previous animations
      gsap.set(menuRef.current, { display: "block" });

      gsap.fromTo(
        menuRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.to(menuRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        delay: 3.5, // Auto-close after 3.5s
        ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) {
            menuRef.current.style.display = "none"; // Hide after fade-out
            setMenu(false);
          }
        },
      });
    } else if (menuRef.current) {
      gsap.killTweensOf(menuRef.current); // Kill any fade-out animation
      gsap.to(menuRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) {
            menuRef.current.style.display = "none"; // Instantly hide on manual close
            setMenu(false);
          }
        },
      });
    }
  }, [menu]);

  return (
    <div className="fixed bg-white/10 md:bg-transparent flex items-center md:items-end justify-between px-4 md:px-16 w-screen h-[5rem] md:h-[5.5rem] z-15">
      {/* Branding / Logo */}
      <div
        className={`lobster text-3xl md:text-5xl ${invert} cursor-pointer`}
        onClick={() => setContact(false)}
      >
        KryshnaXP
      </div>

      {/* Right side menu items */}
      <div className="flex items-center gap-2 md:gap-8">
        {/* Theme Selector Button */}
        <div
          className={`rounded-full cursor-pointer hover:scale-105 hover:brightness-110 ${offBg}`}
        >
          <div
            className={`lobster text-2xl md:text-lg flex justify-center items-center p-2 gap-2 rounded-full border-2 ${invert} invert-100`}
            onClick={handleClick}
          >
            <IoMdColorPalette />
            <span className="hidden md:block">{theme}</span>
          </div>
        </div>

        {/* Profile Picture */}
        <img
          src="/Images/profile_pic.jpg"
          alt="Profile"
          className="profile-pic brightness-135 cursor-pointer w-10 h-10 md:w-16 md:h-16"
          onClick={handleProfile}
        />
      </div>

      {/* Theme Selection Menu */}
      <div
        ref={menuRef}
        className={`fixed md:right-38 right-8 top-14 md:top-24 px-2 rounded-lg opacity-0 ${offBg}`}
      >
        <ThemeOption theme="light" invert={invert} onClick={handleSetTheme} border={true} />
        <ThemeOption theme="neutral" invert={invert} onClick={handleSetTheme} border={true} />
        <ThemeOption theme="dark" invert={invert} onClick={handleSetTheme} border={false} />
      </div>
    </div>
  );
}

/**
 * ThemeOption Component - Renders a theme selection button.
 * @param {Object} props - ThemeOption Props
 * @param {Theme} props.theme - Theme Name (light, neutral, dark)
 * @param {string} props.invert - Invert class for styling
 * @param {(theme: Theme) => void} props.onClick - Click handler for theme change
 */
const ThemeOption = ({
  theme,
  invert,
  onClick,
  border,
}: {
  theme: Theme;
  invert: string;
  onClick: (theme: Theme) => void;
  border: boolean;
}) => (
  <div
    className={`p-1 ${
      border && "border-b"
    } cursor-pointer ${invert} invert-100`}
    onClick={() => onClick(theme)}
  >
    {theme.charAt(0).toUpperCase() + theme.slice(1)}
  </div>
);

export default Navbar;
