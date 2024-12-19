import { useThemeStore, gradientThemes } from "../store/themeStore";
import { useEffect } from "react";
import { cn } from "../utils/cn";

export default function ThemeSelector() {
  const { currentTheme, setTheme } = useThemeStore();

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
    <div className="grid grid-cols-1 gap-2 w-full py-2">
      {gradientThemes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => setTheme(theme)}
          className={cn(
            "relative px-4 py-2 rounded-lg border-2 transition-all",
            "hover:scale-100 hover:shadow-lg",
            currentTheme?.id === theme.id
              ? " border-slate-600 shadow-lg scale-100"
              : "border-transparent"
          )}
        >
          <div className="grid grid-cols-[auto_1fr] items-center gap-2 text-center">
            <div
              className={cn(
                "h-6 w-6 rounded-full bg-gradient-to-r",
                theme.class
              )}
            />
            <p className="text-sm font-medium text-theme whitespace-nowrap">
              {theme.name}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
