import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Sun, Moon, Star, Sparkles, Heart } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function OnboardingScreen() {
  const { isDarkMode, toggleDarkMode, colors } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = new Animated.Value(1);

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  const handleSocialSignUp = (platform: string) => {
    // Animate transition
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      handleGetStarted();
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={isDarkMode ? [colors.surface, colors.surfaceSecondary, colors.primary] : ['#E8D5FF', '#B8F2D6', '#FFD4C4']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header with dark mode toggle */}
        <View style={styles.header}>
          <View style={styles.modeToggle}>
            <Sun size={20} color={isDarkMode ? colors.textTertiary : colors.text} />
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.primaryLight, true: colors.border }}
              thumbColor={isDarkMode ? colors.primaryLight : colors.text}
              style={styles.switch}
            />
            <Moon size={20} color={isDarkMode ? colors.primaryLight : colors.textTertiary} />
          </View>
        </View>

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <View style={styles.iconContainer}>
                <Sparkles size={40} color="#E8D5FF" />
                <Star size={24} color="#B8F2D6" style={styles.floatingIcon} />
                <Heart size={20} color="#FFD4C4" style={styles.floatingIcon2} />
              </View>
              
              <Text style={[styles.appName, isDarkMode && styles.darkText]}>
                GlowUp
              </Text>
              
              <Text style={[styles.tagline, { color: colors.textSecondary }]}>
                Let's get glowing 🌟
              </Text>
              
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Your AI-powered skincare companion that gets you ✨
              </Text>
            </View>

            {/* Features Preview */}
            <View style={styles.featuresContainer}>
              <View style={[styles.featureCard, { backgroundColor: colors.surface }]}>
                <Text style={styles.featureEmoji}>🤳</Text>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  Snap & Analyze
                </Text>
                <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>
                  AI skin analysis in seconds
                </Text>
              </View>
              
              <View style={[styles.featureCard, { backgroundColor: colors.surface }]}>
                <Text style={styles.featureEmoji}>🧴</Text>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  Perfect Match
                </Text>
                <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>
                  Products made for your skin
                </Text>
              </View>
              
              <View style={[styles.featureCard, { backgroundColor: colors.surface }]}>
                <Text style={styles.featureEmoji}>📅</Text>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  Track Progress
                </Text>
                <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>
                  Watch your glow-up journey
                </Text>
              </View>
            </View>

            {/* Sign Up Options */}
            <View style={styles.signUpContainer}>
              <TouchableOpacity
                style={[styles.primaryButton, styles.googleButton]}
                onPress={() => handleSocialSignUp('google')}
              >
                <Text style={styles.buttonText}>Continue with Google</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.primaryButton, styles.appleButton]}
                onPress={() => handleSocialSignUp('apple')}
              >
                <Text style={styles.buttonText}>Continue with Apple</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.secondaryButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={() => handleSocialSignUp('email')}
              >
                <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
                  Sign up with Email
                </Text>
              </TouchableOpacity>
            </View>

            {/* Call to Action */}
            <View style={styles.ctaContainer}>
              <TouchableOpacity
                style={[styles.startButton, { backgroundColor: isDarkMode ? colors.primary : '#E8D5FF' }]}
                onPress={handleGetStarted}
              >
                <Text style={styles.startButtonText}>Start My Glow Journey</Text>
                <Sparkles size={20} color="#fff" style={styles.buttonIcon} />
              </TouchableOpacity>
              
              <Text style={[styles.disclaimer, { color: colors.textTertiary }]}>
                By continuing, you agree to our Terms & Privacy Policy
              </Text>
            </View>
          </ScrollView>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  modeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  switch: {
    marginHorizontal: 8,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  floatingIcon: {
    position: 'absolute',
    top: -10,
    right: -15,
  },
  floatingIcon2: {
    position: 'absolute',
    bottom: -5,
    left: -20,
  },
  appName: {
    fontSize: 42,
    fontWeight: '800',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 24,
    fontWeight: '600',
    color: '#555',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  featureCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  featureEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  signUpContainer: {
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#333',
    borderRadius: 25,
    paddingVertical: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  secondaryButton: {
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  ctaContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  startButton: {
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  startButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 40,
  },
});