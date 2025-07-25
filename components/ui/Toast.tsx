import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Check, CircleAlert as AlertCircle, Info, X } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

export function Toast({ message, type, visible, onHide, duration = 3000 }: ToastProps) {
  const { colors } = useTheme();
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0);
      opacity.value = withTiming(1);
      
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    translateY.value = withSpring(-100);
    opacity.value = withTiming(0, {}, () => {
      runOnJS(onHide)();
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const getToastStyle = () => {
    switch (type) {
      case 'success':
        return { backgroundColor: colors.success };
      case 'error':
        return { backgroundColor: colors.error };
      case 'warning':
        return { backgroundColor: colors.warning };
      case 'info':
      default:
        return { backgroundColor: colors.primary };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check size={20} color="#fff" />;
      case 'error':
        return <X size={20} color="#fff" />;
      case 'warning':
        return <AlertCircle size={20} color="#fff" />;
      case 'info':
      default:
        return <Info size={20} color="#fff" />;
    }
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, getToastStyle(), animatedStyle]}>
      {getIcon()}
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  message: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    flex: 1,
  },
});