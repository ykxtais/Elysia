import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@theme';

export const LIGHT = {
  background: '#F7F8FA',
  surface:    '#FFFFFF',
  card:       '#FFFFFF',
  text:       '#13151A',
  textMuted:  '#6B7280',
  border:     '#E7E9EE',

  primary:    '#00ADA7',
  onPrimary:  '#FFFFFF',
  secondary:  '#9CA1CF',
  onSecondary:'#10131A',

  accentBg:   '#E0FFFA',
  accentText: '#00373B',
  accentBorder:'#B8F3EA',

  surfaceStrong:   '#F1F4F8',
  surfaceContrast: '#FDFEFE',

  success: '#3CCB7E',
  danger:  '#E15B58',
  warning: '#F5B841',
};

export const DARK = {
  background: '#0E1118',
  surface:    '#121622',
  card:       '#0F1420',
  text:       '#E7EAF1',
  textMuted:  '#A6B0BF',
  border:     '#222937',

  primary:    '#1AD1C6',
  onPrimary:  '#071218',
  secondary:  '#8EA0DF',
  onSecondary:'#0B0F18',

  accentBg:    '#0E2A2A',
  accentText:  '#C9F9F3',
  accentBorder:'#144B49',

  surfaceStrong:   '#171C2A',
  surfaceContrast: '#0B1020',

  success: '#34D399',
  danger:  '#EF6A67',
  warning: '#F59E0B',
};


export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemScheme = Appearance.getColorScheme();
  const [mode, setMode] = useState(systemScheme ?? 'light');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') setMode(saved);
      } catch {}
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, mode).catch(() => {});
  }, [mode, ready]);

  const followSystem = useCallback(async () => {
    try { await AsyncStorage.removeItem(STORAGE_KEY); } catch {}
    const sys = Appearance.getColorScheme() ?? 'light';
    setMode(sys);
  }, []);

  const toggle = useCallback(() => {
    setMode(m => (m === 'light' ? 'dark' : 'light'));
  }, []);

  const set = useCallback((m) => {
    if (m === 'light' || m === 'dark') setMode(m);
  }, []);

  useEffect(() => {
    let sub;
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (!saved) {
        sub = Appearance.addChangeListener(({ colorScheme }) => {
          setMode(colorScheme ?? 'light');
        });
      }
    })();
    return () => { if (sub) sub.remove(); };
  }, []);

  const colors = mode === 'dark' ? DARK : LIGHT;
  const value = useMemo(() => ({ mode, colors, toggle, set, followSystem }), [mode, colors, toggle, set, followSystem]);

  if (!ready) return null;
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('ThemeProvider ausente');
  return ctx;
}

export function useThemedStyles(factory) {
  const { colors, mode } = useTheme();
  return useMemo(() => factory({ colors, scheme: mode }), [colors, mode, factory]);
}

export default ThemeProvider;