import React, { createContext, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '@/store/themeSlice';

// Create ThemeContext
const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const theme = useSelector(state => state.theme.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const classList = document.documentElement.classList;
    classList.remove('light', 'dark');

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      classList.add(prefersDark ? 'dark' : 'light');
    } else {
      classList.add(theme);
    }
  }, [theme]);

  const handleSetTheme = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
