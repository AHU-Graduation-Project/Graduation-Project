import React, { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  const [location, setLocation] = useState<string>("Fetching location...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(
            `Lat: ${latitude.toFixed(2)}, Long: ${longitude.toFixed(2)}`
          );
        },
        () => setLocation("Unable to retrieve location")
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <footer className="bg-gray-800 dark:bg-custom-gradient-dark text-gray-300 py-6">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex flex-col items-center space-y-4 mb-5">
          {/* <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Devpath
          </h1> */}
        </div>

        <div className="flex justify-center space-x-6 mb-5">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white dark:hover:text-gray-200 transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white dark:hover:text-gray-200 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white dark:hover:text-gray-200 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white dark:hover:text-gray-200 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        <div className="flex justify-center space-x-6 mb-5 text-sm">
          <a
            href="/privacy-policy"
            className="hover:text-white dark:hover:text-gray-200 transition-colors"
          >
            Privacy Policy
          </a>
          <span className="text-gray-500 dark:text-gray-400">|</span>
          <a
            href="/terms-of-use"
            className="hover:text-white dark:hover:text-gray-200 transition-colors"
          >
            Terms of Use
          </a>
        </div>
        <p>Jordan</p>

        <div className="border-t border-gray-700 my-6 w-3/4 dark:border-gray-500"></div>

        <div className="text-center text-sm">
          <p>© {new Date().getFullYear()} Devpath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
