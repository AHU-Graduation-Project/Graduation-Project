import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import BrowseRoadmaps from './pages/BrowseRoadmaps';
import RoadmapFlow from './components/RoadmapFlow';
import GenerateRoadmap from './pages/GenerateRoadmap';
import Overview from './pages/Overview';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { ThemeProvider } from './context/ThemeContext';
import FooterComponent from './components/Footer';
import { useThemeStore } from './store/themeStore';

function AppContent() {
  const location = useLocation();
  const showFooter = !location.pathname.startsWith('/roadmap');
  const { currentTheme } = useThemeStore();

  // Initialize theme on app load
  useEffect(() => {
    if (currentTheme) {
      document.documentElement.style.setProperty('--theme-from', currentTheme.colors.from);
      document.documentElement.style.setProperty('--theme-to', currentTheme.colors.to);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      <Header />
      <Routes>
        <Route path="/" element={<BrowseRoadmaps />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/generate" element={<GenerateRoadmap />} />
        <Route path="/roadmap/:id" element={<RoadmapFlow />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showFooter && <FooterComponent />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}