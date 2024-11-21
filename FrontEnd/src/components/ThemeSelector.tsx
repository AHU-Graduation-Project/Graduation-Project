import { useThemeStore, gradientThemes } from '../store/themeStore';
import { useEffect } from 'react';
import { cn } from '../utils/cn';

export default function ThemeSelector() {
  const { currentTheme, setTheme } = useThemeStore();

  useEffect(() => {
    if (currentTheme) {
      document.documentElement.style.setProperty('--theme-from', currentTheme.colors.from);
      document.documentElement.style.setProperty('--theme-to', currentTheme.colors.to);
    }
  }, [currentTheme]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {gradientThemes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => setTheme(theme)}
          className={cn(
            "relative p-4 rounded-lg border-2 transition-all",
            "hover:scale-105 hover:shadow-lg",
            currentTheme?.id === theme.id
              ? "border-white/20 shadow-lg scale-105"
              : "border-transparent"
          )}
        >
          <div
            className={cn(
              "h-20 w-full rounded-lg bg-gradient-to-r",
              theme.class
            )}
          />
          <p className="mt-2 text-sm font-medium text-center">{theme.name}</p>
        </button>
      ))}
    </div>
  );
}