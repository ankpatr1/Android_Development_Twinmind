// hooks/useColorScheme.ts

import { useColorScheme as _useColorScheme } from 'react-native';

export function useColorScheme(): 'light' | 'dark' {
  return _useColorScheme() ?? 'light';
}
