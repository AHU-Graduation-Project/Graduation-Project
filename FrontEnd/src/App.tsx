import { HashRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import BrowseRoadmaps from "./pages/BrowseRoadmaps";
import RoadmapFlow from "./components/RoadmapFlow";
import GenerateRoadmap from "./pages/GenerateRoadmap";
import NotFoundPage from "./pages/NotFoundPage";
import Overview from "./pages/Overview";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Background from "./components/Background";
import { ThemeProvider } from "./context/ThemeContext";
import FooterComponent from "./components/Footer";
import { useThemeStore } from "./store/themeStore";

function AppContent() {
  const location = useLocation();
  const { currentTheme } = useThemeStore();

  // Check if current route is "/Auth"
  const isAuthPage = location.pathname === "/auth";

  // Initialize theme on app load
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
      document.documentElement.style.setProperty(
        "--theme-from",
        currentTheme.colors.from
      );
      document.documentElement.style.setProperty(
        "--theme-to",
        currentTheme.colors.to
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/roadmaps" element={<BrowseRoadmaps />} />
        <Route path="/generate" element={<GenerateRoadmap />} />
        <Route path="/roadmap/:id" element={<RoadmapFlow />} />
        <Route
          path="/auth"
          element={
            <div className="relative w-full h-screen">
              <Background />
              <Auth />
            </div>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isAuthPage && <FooterComponent />}
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
