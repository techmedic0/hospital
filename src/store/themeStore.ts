import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  currentTheme: string;
  customColors: {
    primary: {
      teal: string;
      blue: string;
    };
    accent: {
      cyan: string;
      coral: string;
    };
  };
  toggleDarkMode: () => void;
  setTheme: (theme: string) => void;
  setCustomColors: (colors: ThemeState['customColors']) => void;
}

const presetThemes = {
  default: {
    primary: {
      teal: '#008080',
      blue: '#007BFF',
    },
    accent: {
      cyan: '#00F0FF',
      coral: '#FF6B6B',
    },
  },
  calm: {
    primary: {
      teal: '#4A90E2',
      blue: '#5C6BC0',
    },
    accent: {
      cyan: '#81DEEA',
      coral: '#90CAF9',
    },
  },
  professional: {
    primary: {
      teal: '#455A64',
      blue: '#546E7A',
    },
    accent: {
      cyan: '#78909C',
      coral: '#90A4AE',
    },
  },
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      currentTheme: 'default',
      customColors: presetThemes.default,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setTheme: (theme) => set({ currentTheme: theme, customColors: presetThemes[theme as keyof typeof presetThemes] }),
      setCustomColors: (colors) => set({ customColors: colors }),
    }),
    {
      name: 'theme-storage',
    }
  )
);