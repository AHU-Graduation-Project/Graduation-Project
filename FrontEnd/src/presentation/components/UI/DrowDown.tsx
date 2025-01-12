import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Info, Palette, LogOut, LogIn } from "lucide-react";
import ThemeIcon from "./ThemeIcon";
import ThemeSelector from "./ThemeSelector";
import { useAuthStore } from "../../../application/state/authStore";
import { useNavigate } from "react-router-dom";

function DropdownToggle({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const [isColors, setIsColors] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const handleColors = () => setIsColors(!isColors);
  const handleLogout = () => {
    if (user) {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="relative">
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 w-60 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-2 px-4 z-40">
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
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-2 w-full rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <ThemeIcon icon={LogOut} className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <ThemeIcon icon={LogIn} className="w-5 h-5" />
                    <span>Sign in</span>
                  </Link>
                )}
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

      {/* Dropdown Toggle Button */}
      <button
        onClick={handleToggle}
        className="p-2 rounded-full border bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <ThemeIcon icon={User} className="w-5 h-5" />
      </button>
    </div>
  );
}

export default DropdownToggle;
