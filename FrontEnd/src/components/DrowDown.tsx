import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Info, Palette, LogOut } from "lucide-react";
// import { cn } from "../utils/cn";
import ThemeIcon from "./ThemeIcon";
import ThemeSelector from "./ThemeSelector";

function DropdownToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [isColors, setIsColors] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleColors = () => setIsColors(!isColors);
  const handleMobileMenu = () => setIsMobileMenu(!isMobileMenu);

  const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.closest(".dropdown-toggle-button")) return;
    setIsOpen(false);
    setIsMobileMenu(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative dropdown-toggle-button">
      {/* Desktop Dropdown Toggle */}
      <button
        onClick={handleToggle}
        className="hidden md:flex p-2 rounded-full border bg-transparent transition-colors items-center gap-1"
      >
        <ThemeIcon icon={User} className="w-5 h-5" />
      </button>

      {/* Mobile Menu Toggle */}
      <button
        onClick={handleMobileMenu}
        className="md:hidden p-2 rounded-full  border bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <ThemeIcon icon={User} className="w-5 h-5" />
      </button>

      {/* Desktop Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-40 right-0 mt-2 w-60 bg-white dark:bg-slate-800 rounded-xl shadow-lg hidden md:block">
          <ul className="py-2">
            <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all">
              <ThemeIcon icon={Info} className="w-5 h-5" />
              <Link to="/Profile">My Profile</Link>
            </li>

            <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all">
              <ThemeIcon icon={LogOut} className="w-5 h-5" />
              <button>LogOut</button>
            </li>

            <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />

            <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all">
              <ThemeIcon icon={Palette} className="w-5 h-5" />
              <button onClick={handleColors}>Color Themes</button>
            </li>

            {isColors && <ThemeSelector />}
          </ul>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {isMobileMenu && (
        <div className="fixed inset-x-0 top-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <ul className="py-2">
              <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <ThemeIcon icon={Info} className="w-5 h-5" />
                <Link to="/Profile">My Profile</Link>
              </li>

              <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <ThemeIcon icon={LogOut} className="w-5 h-5" />
                <button>LogOut</button>
              </li>

              <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />

              <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <ThemeIcon icon={Palette} className="w-5 h-5" />
                <button onClick={handleColors}>Color Themes</button>
              </li>

              {isColors && <ThemeSelector />}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default DropdownToggle;
