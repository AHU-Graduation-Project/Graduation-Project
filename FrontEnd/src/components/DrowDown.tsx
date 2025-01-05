import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Info, Palette, LogOut } from "lucide-react";
import ThemeIcon from "./ThemeIcon";
import ThemeSelector from "./ThemeSelector";
import { useAuthStore } from "../store/authStore";

function DropdownToggle({
  isOpen,
  onOpen,
  onClose,
  dropdownRef,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}) {
  const [isColors, setIsColors] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const { user } = useAuthStore();

  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const handleColors = () => setIsColors(!isColors);

  const handleLogout = () => {
    if (user) logout();
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={dropdownRef}
      className="relative dropdown-toggle-button"
      onClick={handleDropdownClick}
    >
      {/* Desktop Dropdown Toggle */}
      <button
        onClick={handleToggle}
        className="hidden md:flex p-2 rounded-full border bg-transparent transition-colors items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <ThemeIcon icon={User} className="w-5 h-5" />
      </button>

      {/* Mobile Menu Toggle */}
      <button
        onClick={handleToggle}
        className="md:hidden p-2 rounded-full border bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <ThemeIcon icon={User} className="w-5 h-5" />
      </button>

      {/* Desktop Dropdown Menu */}
      {isOpen && (
        <div className="hidden md:block absolute top-full right-0 w-60 z-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-2 px-4">
          <nav className="flex flex-col gap-2">
            <ul>
              {user && (
                <Link
                  to="/Profile"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <ThemeIcon icon={Info} className="w-5 h-5" />
                  My Profile
                </Link>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-2 w-full rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <ThemeIcon icon={LogOut} className="w-5 h-5" />
                  {user ? "Logout" : "Sign In"}
                </button>
              </li>
              <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />
              <li>
                <button
                  onClick={handleColors}
                  className="flex items-center gap-3 p-2 w-full rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <ThemeIcon icon={Palette} className="w-5 h-5" />
                  Color Themes
                </button>
              </li>
              {isColors && <ThemeSelector />}
            </ul>
          </nav>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm  top-20 z-40  border-b border-slate-200 dark:border-slate-700 p-4">
          <nav className="flex flex-col gap-4">
            <ul>
              {user && (
                <Link
                  to="/Profile"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ThemeIcon icon={Info} className="w-5 h-5" />
                  My Profile
                </Link>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ThemeIcon icon={LogOut} className="w-5 h-5" />
                  {user ? "Logout" : "Sign In"}
                </button>
              </li>
              <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />
              <li>
                <button
                  onClick={handleColors}
                  className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ThemeIcon icon={Palette} className="w-5 h-5" />
                  Color Themes
                </button>
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
