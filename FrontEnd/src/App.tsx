import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { useThemeStore } from "./store/themeStore";
import AppRoutes from "./presentation/routes/AppRoutes";

function AppContent() {
  const { currentTheme } = useThemeStore();

  useEffect(() => {
    if (currentTheme) {
      document.documentElement.style.setProperty(
        "--theme-from",
        currentTheme.colors.from
      );
      document.documentElement.style.setProperty(
        "--theme-to",
        currentTheme.colors.to
      );
    }
  }, [currentTheme]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      <AppRoutes />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}
