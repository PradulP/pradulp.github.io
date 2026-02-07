import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
  FaGithub
} from "react-icons/fa";
import content from "../data/index";

const SocialIcons = ({ size = 22, spacing = "space-x-4" }) => {
  const { socials, contact } = content || {};

  const links = {
    facebook: socials?.facebook || "https://www.facebook.com/pradul.prashandan",
    instagram: socials?.instagram || "https://www.instagram.com/pradul_prashandan/",
    linkedin: socials?.linkedin || "https://www.linkedin.com/in/pradul/",
    youtube: socials?.youtube || "https://www.youtube.com/channel/UC13ZcNIVcB1-3F0xV8y1F0w",
    github: socials?.github || "https://github.com/PRADUL-P",
    whatsapp: contact?.whatsapp
      ? `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`
      : "https://wa.me/918078376902",
  };

  return (
    <div className={`inline-flex items-center justify-center ${spacing}`}>
      <a
        href={links.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 hover:scale-110 transition"
      >
        <FaFacebookF size={size} />
      </a>

      <a
        href={links.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 hover:text-pink-700 hover:scale-110 transition"
      >
        <FaInstagram size={size} />
      </a>

      <a
        href={links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-500 hover:text-sky-700 hover:scale-110 transition"
      >
        <FaLinkedinIn size={size} />
      </a>

      <a
        href={links.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-500 hover:text-red-700 hover:scale-110 transition"
      >
        <FaYoutube size={size} />
      </a>

      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-gray-200 hover:scale-110 transition"
      >
        <FaGithub size={size} />
      </a>

      <a
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-green-700 hover:scale-110 transition"
      >
        <FaWhatsapp size={size} />
      </a>
    </div>
  );
};

export default SocialIcons;
