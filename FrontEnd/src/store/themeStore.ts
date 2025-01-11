import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type GradientTheme = {
  id: string;
  name: string;
  colors: {
    from: string;
    to: string;
  };
  class: string;
  iconColor: string;
};

export const gradientThemes: GradientTheme[] = [
  {
    id: 'blue-purple',
    name: 'Ocean Breeze',
    colors: {
      from: '#3B82F6',
      to: '#8B5CF6'
    },
    class: 'from-blue-500 to-purple-500',
    iconColor: 'text-blue-500'
  },
  {
    id: 'emerald-teal',
    name: 'Forest Mist',
    colors: {
      from: '#10B981',
      to: '#14B8A6'
    },
    class: 'from-emerald-500 to-teal-500',
    iconColor: 'text-emerald-500'
  },
  {
    id: 'rose-pink',
    name: 'Sunset Glow',
    colors: {
      from: '#F43F5E',
      to: '#EC4899'
    },
    class: 'from-rose-500 to-pink-500',
    iconColor: 'text-rose-500'
  },{
  id: 'blue-green',
  name: 'Ocean Breeze',
  colors: {
    from: '#3B82F6',
    to: '#10B981'
  },
  class: 'from-blue-500 to-green-500',
  iconColor: 'text-blue-500'
},
{
  id: 'pink-purple',
  name: 'Sunset Glow',
  colors: {
    from: '#EC4899',
    to: '#8B5CF6'
  },
  class: 'from-pink-500 to-purple-500',
  iconColor: 'text-pink-500'
},
{
  id: 'red-yellow',
  name: 'Fiery Sunset',
  colors: {
    from: '#EF4444',
    to: '#F59E0B'
  },
  class: 'from-red-500 to-yellow-500',
  iconColor: 'text-red-500'
},

{
  id: 'yellow-pink',
  name: 'Golden Hour',
  colors: {
    from: '#FBBF24',
    to: '#F472B6'
  },
  class: 'from-yellow-500 to-pink-500',
  iconColor: 'text-yellow-500'
}
,
  {
    id: 'cyan-blue',
    name: 'Arctic Ice',
    colors: {
      from: '#06B6D4',
      to: '#3B82F6'
    },
    class: 'from-cyan-500 to-blue-500',
    iconColor: 'text-cyan-500'
  }
];

interface ThemeState {
  currentTheme: GradientTheme;
  setTheme: (theme: GradientTheme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      currentTheme: gradientThemes[2],
      setTheme: (theme) => {
        set({ currentTheme: theme });
        document.documentElement.style.setProperty('--theme-from', theme.colors.from);
        document.documentElement.style.setProperty('--theme-to', theme.colors.to);
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.currentTheme) {
          document.documentElement.style.setProperty('--theme-from', state.currentTheme.colors.from);
          document.documentElement.style.setProperty('--theme-to', state.currentTheme.colors.to);
        }
      },
    }
  )
);