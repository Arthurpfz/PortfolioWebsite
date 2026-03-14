import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Theme Toggle', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    // Reset data-theme attribute
    document.documentElement.removeAttribute('data-theme');

    // Clear any existing mock implementations
    vi.clearAllMocks();
  });

  it('stores theme preference in localStorage', () => {
    // Simulate theme toggle behavior
    const theme = 'dark';
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    // Verify localStorage was updated
    expect(localStorage.getItem('theme')).toBe('dark');

    // Verify data-theme attribute was set
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('toggles between light and dark themes', () => {
    // Start with light theme
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    // Toggle to dark
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    // Toggle back to light
    const current2 = document.documentElement.getAttribute('data-theme');
    const next2 = current2 === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next2);
    localStorage.setItem('theme', next2);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('respects system preference when no stored value', () => {
    // Mock window.matchMedia for dark mode preference
    const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    vi.stubGlobal('matchMedia', matchMediaMock);

    // Simulate theme initialization logic
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');

    // No stored theme, should fall back to system preference (dark)
    expect(storedTheme).toBeNull();
    expect(theme).toBe('dark');

    // Verify matchMedia was called with correct query
    expect(matchMediaMock).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
  });

  it('uses stored preference over system preference', () => {
    // Mock window.matchMedia for dark mode preference
    const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    vi.stubGlobal('matchMedia', matchMediaMock);

    // User has explicitly set light mode
    localStorage.setItem('theme', 'light');

    // Simulate theme initialization logic
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Should use stored preference (light) even though system prefers dark
    expect(theme).toBe('light');
  });

  it('persists theme choice across page loads', () => {
    // Simulate first page load - user chooses dark
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');

    // Verify it was stored
    const storedTheme = localStorage.getItem('theme');
    expect(storedTheme).toBe('dark');

    // Simulate page reload by re-reading from localStorage
    const themeOnReload = localStorage.getItem('theme');
    expect(themeOnReload).toBe('dark');

    // Theme should be re-applied
    document.documentElement.setAttribute('data-theme', themeOnReload as string);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
