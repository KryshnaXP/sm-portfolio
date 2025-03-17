import { FaGithub, FaInstagram} from "react-icons/fa"; //, FaLinkedinIn 
import { MdEmail } from "react-icons/md";

/**
 * Social media links with corresponding icons and URLs.
 */
const socialLinks = [
  {
    icon: <MdEmail />,
    label: "Email",
    url: "mailto:kryshanxp@gmail.com",
  },
  {
    icon: <FaGithub />,
    label: "GitHub",
    url: "https://github.com/KryshnaXP",
  },
  // {
  //   icon: <FaLinkedinIn />,
  //   label: "LinkedIn",
  //   url: "https://linkedin.com/in/yourprofile", // Update with actual LinkedIn URL
  // },
  {
    icon: <FaInstagram />,
    label: "Instagram",
    url: "https://www.instagram.com/x_soumajit_x/",
  },
];

export default socialLinks;
