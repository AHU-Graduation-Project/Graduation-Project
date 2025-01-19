import { Link } from "react-router-dom";
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-custom-gradient-dark text-gray-300 py-8 relative z-20">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-6">
        {/* Logo Section */}
        <div>
          <a
            href="/"
            className="text-theme text-2xl font-bold hover:text-gray-300 transition-colors"
          >
            Devpath
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 w-full dark:border-gray-500 mt-2"></div>

        {/* Copyright and Links */}
        <div className="flex flex-col items-center space-y-2 text-sm ">
          <div className="flex justify-center space-x-4">
            <Link
              to="/term&privacy"
              className="hover:text-white dark:hover:text-gray-200 transition-colors"
            >
              Privacy & Terms
            </Link>
          </div>
          <p className="text-center pt-4">
            © {new Date().getFullYear()} Devpath. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
