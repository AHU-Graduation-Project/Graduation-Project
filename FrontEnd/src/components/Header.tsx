import { useState } from "react";
import {
  Code2,
  Map,
  Sparkles,
  BarChart2,
  User,
  Menu,
  X,
  Languages,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import ThemeIcon from "./ThemeIcon";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  };

  const menuItems = [
    { to: "/", icon: Code2, label: t("nav.roadmaps") },
    { to: "/overview", icon: BarChart2, label: t("nav.overview") },
    { to: "/generate", icon: Sparkles, label: t("nav.generate") },
    { to: "/profile", icon: User, label: t("nav.profile") },
  ];

  return (
    <header className="border-b border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <ThemeIcon icon={Map} className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-theme">DevRoadmap</h1>
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
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ThemeIcon icon={Languages} className="w-5 h-5" />
          </button>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ThemeIcon icon={Languages} className="w-5 h-5" />
          </button>
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isMenuOpen ? (
              <ThemeIcon icon={X} className="w-6 h-6" />
            ) : (
              <ThemeIcon icon={Menu} className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
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
