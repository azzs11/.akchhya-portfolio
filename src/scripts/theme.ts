// Night mode and room memory. The first paint is handled by the inline
// script in Base.astro; these helpers are for buttons and the palette.

export type Theme = 'light' | 'night';

const THEME_KEY = 'theme';

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // private mode or blocked storage: the choice just won't persist
  }
}

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'night' ? 'night' : 'light';
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  store(THEME_KEY, theme);
  document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

export function toggleTheme() {
  setTheme(getTheme() === 'night' ? 'light' : 'night');
}
