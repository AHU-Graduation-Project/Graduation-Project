import { HashRouter } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { useThemeStore } from "./store/themeStore";
import Header from "./presentation/components/layout/Header";
import Footer from "./presentation/components/layout/Footer";
import AppRoutes from "./presentation/routes/AppRoutes";
import { useLocation } from "react-router-dom";

function AppContent() {
  const { currentTheme } = useThemeStore();
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";
  const isRoadMap = location.pathname === "/roadmap";

  useEffect(() => {
    if (currentTheme) {
      document.documentElement.style.setProperty("--theme-from", currentTheme.colors.from);
      document.documentElement.style.setProperty("--theme-to", currentTheme.colors.to);
    }
  }, [currentTheme]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      {!isAuthPage && <Header />}
      <AppRoutes />
      {!(isAuthPage || isRoadMap) && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ThemeProvider>
  );
}