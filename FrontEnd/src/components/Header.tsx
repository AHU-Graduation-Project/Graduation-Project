import { useState, useEffect, useRef } from "react";
import { Code2, Map, Sparkles, BarChart2, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import ThemeIcon from "./ThemeIcon";
import DropDown from "./DrowDown";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<
    "header" | "dropdown" | null
  >(null);

  const closeDropdown = () => setActiveDropdown(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".dropdown-toggle-button")) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { to: "/overview", icon: BarChart2, label: "Overview" },
    { to: "/", icon: Code2, label: "Roadmaps" },
    { to: "/generate", icon: Sparkles, label: "Generate" },
  ];

  const toggleHeaderMenu = () => {
    setActiveDropdown(activeDropdown === "header" ? null : "header");
  };

  return (
    <header className="border-b border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <ThemeIcon icon={Map} className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-theme">DevPath</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors group"
            >
              <ThemeIcon icon={item.icon} className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}
          <ThemeToggle />
          <DropDown
            isOpen={activeDropdown === "dropdown"}
            onOpen={() => setActiveDropdown("dropdown")}
            onClose={closeDropdown}
          />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <DropDown
            isOpen={activeDropdown === "dropdown"}
            onOpen={() => setActiveDropdown("dropdown")}
            onClose={closeDropdown}
          />

          <button
            onClick={toggleHeaderMenu}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {activeDropdown === "header" ? (
              <ThemeIcon icon={X} className="w-6 h-6" />
            ) : (
              <ThemeIcon icon={Menu} className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {activeDropdown === "header" && (
          <div className="md:hidden fixed inset-x-0 top-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeDropdown}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                >
                  <ThemeIcon icon={item.icon} className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
