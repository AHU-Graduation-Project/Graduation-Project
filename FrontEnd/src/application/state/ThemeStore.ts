import {
  GradientTheme,
  gradientThemes,
} from "../../domain/models/GradientTheme";

export type Theme = GradientTheme;

export interface ThemeStoreState {
  currentTheme: Theme;
  availableThemes: Theme[];
  setCurrentTheme: (theme: Theme) => void;
}

class ThemeStore {
  private currentTheme: GradientTheme;

  constructor() {
    const storedTheme = localStorage.getItem("currentTheme");
    this.currentTheme = storedTheme
      ? gradientThemes.find(
          (theme) => theme.id === JSON.parse(storedTheme).id
        ) || gradientThemes[0]
      : gradientThemes[0];
    this.updateCSSVariables();
  }
  getCurrentTheme(): GradientTheme {
    return this.currentTheme;
  }

  setTheme(newTheme: GradientTheme): void {
    if (!gradientThemes.find((theme) => theme.id === newTheme.id)) {
      throw new Error("Invalid theme selection.");
    }
    this.currentTheme = newTheme;
    this.updateCSSVariables();
  }

  getAvailableThemes(): GradientTheme[] {
    return gradientThemes;
  }

  private updateCSSVariables(): void {
    const root = document.documentElement;
    root.style.setProperty("--theme-from", this.currentTheme.colors.from);
    root.style.setProperty("--theme-to", this.currentTheme.colors.to);
  }
}

export const themeStore = new ThemeStore();
