import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Custom storage adapter for Expo SecureStore, SSR-safe
const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    if (Platform.OS === 'web' && isBrowser) {
      return window.localStorage.getItem(key);
    }
    if (Platform.OS !== 'web') {
      return SecureStore.getItemAsync(key);
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    if (Platform.OS === 'web' && isBrowser) {
      window.localStorage.setItem(key, value);
      return;
    }
    if (Platform.OS !== 'web') {
      SecureStore.setItemAsync(key, value);
    }
  },
  removeItem: (key: string) => {
    if (Platform.OS === 'web' && isBrowser) {
      window.localStorage.removeItem(key);
      return;
    }
    if (Platform.OS !== 'web') {
      SecureStore.deleteItemAsync(key);
    }
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});