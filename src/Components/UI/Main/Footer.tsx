import React, { useRef } from "react";
import gsap from "gsap";
import GlobalIcon from "../../../Assets/Globe";
import { TbCircleLetterAFilled, TbCircleDashedLetterA } from "react-icons/tb";
import { useData } from "../../../Context/ContextProvider";
import useWindowSize from "../../../Context/WindowResize";
import socialLinks from "../../../Data/SocialLinks";
import { Theme } from "../../../Types/types";

/**
 * SocialLink Component
 * - Renders a clickable social media link with icon.
 * - Uses GSAP for hover animations (smooth background transition).
 * - Dynamically adjusts styles based on theme selection.
 */
interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
  compact: boolean;
  theme: Theme;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  children,
  compact,
  theme,
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { width } = useWindowSize();

  // Define background colors based on the current theme
  const themeColors = {
    dark: { bg: "#4c3954", hoverBg: "#426334" },
    light: { bg: "#d2d8ce", hoverBg: "#dfdee0" },
    neutral: { bg: "#8f8991", hoverBg: "#252f22" },
  };

  const { bg, hoverBg } = themeColors[theme];

  /**
   * Handles mouse enter event:
   * - Animates background color change on hover.
   * - Applies an invert filter effect.
   */
  const handleMouseEnter = () => {
    gsap.to(linkRef.current, {
      background: hoverBg,
      filter: "invert(1)",
      duration: 0.3,
      ease: "power3.out",
    });
  };

  /**
   * Handles mouse leave event:
   * - Resets background color after hover.
   * - Removes the invert filter effect.
   */
  const handleMouseLeave = () => {
    gsap.to(linkRef.current, {
      background: bg,
      filter: "invert(0)",
      delay: 0.3,
      duration: 0.1,
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={linkRef}
      className={`rounded-full cursor-pointer ${
        width < 768 && !compact ? "-rotate-90 border-2" : "rotate-0"
      }`}
      style={{ backgroundColor: bg }} // Initial background color
    >
      <div
        className={`p-1.5 ${theme === "light" ? "invert-0" : "invert-85"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </a>
  );
};

/**
 * Footer Component
 * - Displays a footer section with:
 *   - Location (Mumbai, India) linked to Google Maps.
 *   - Social media links dynamically mapped from `socialLinks`.
 *   - Theme-based color adjustments.
 *   - A toggle button for switching between text symbols.
 */
const Footer: React.FC = () => {
  const { theme, setSymbol, symbol } = useData();

  // Define invert class based on the current theme
  const invertClasses: Record<string, string> = {
    dark: "invert-75",
    light: "invert-0",
    netural: "invert-95",
  };

  const invert = invertClasses[theme] || "invert-95";

  return (
    <div className="fixed w-10 md:w-screen md:h-20 -right-8 md:left-0 bottom-2/7 md:bottom-0 px-16 flex flex-col-reverse gap-20 md:gap-0 md:flex-row items-center justify-center md:justify-between z-10">
      {/* Location Link (Mumbai, India) */}
      <SocialLink
        href="https://www.google.com/search?q=mumbai+india"
        compact={false}
        theme={theme}
      >
        <div className="flex items-center">
          <GlobalIcon />
          <p className="px-2 text-xs md:text-sm lobster">Mumbai,&nbsp;India.</p>
        </div>
      </SocialLink>

      {/* Social Media Links & Symbol Toggle */}
      <div className="flex flex-col md:flex-row items-center gap-2">
        {/* Toggle Button for Language Symbol */}
        <div
          className={`md:hidden rounded-full cursor-pointer bg-secondary text-3xl p-0.5 brightness-110 ${invert}`}
          onClick={() => setSymbol(!symbol)}
        >
          {symbol ? <TbCircleDashedLetterA /> : <TbCircleLetterAFilled />}
        </div>

        {/* Social Media Icons */}
        {socialLinks.map((link, index) => (
          <SocialLink key={index} href={link.href} compact={true} theme={theme}>
            {link.icon}
          </SocialLink>
        ))}
      </div>
    </div>
  );
};

export default Footer;
