import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { 
  Camera, 
  Star, 
  TrendingUp, 
  Calendar, 
  Award,
  Sparkles,
  Bell,
  Search
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function HomeScreen() {
  const { colors } = useTheme();
  const [skinType, setSkinType] = useState('Combination');
  const [streakDays, setStreakDays] = useState(7);

  const handleStartAnalysis = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/camera?mode=analysis');
  };

  const handleViewRoutine = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(tabs)/routine');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.text }]}>Hey beautiful! 👋</Text>
            <Text style={[styles.subGreeting, { color: colors.textSecondary }]}>Ready to glow today?</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface }]}>
              <Search size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface }]}>
              <Bell size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={['#E8D5FF', '#D8B4FE']}
            style={styles.streakCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.streakContent}>
              <View>
                <Text style={styles.streakNumber}>{streakDays}</Text>
                <Text style={styles.streakLabel}>Day Streak 🔥</Text>
              </View>
              <Award size={32} color="#fff" />
            </View>
          </LinearGradient>

          <View style={[styles.skinTypeCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.skinTypeLabel, { color: colors.textSecondary }]}>Your Skin Type</Text>
            <Text style={[styles.skinTypeValue, { color: colors.text }]}>Your Skin Type</Text>
            <TouchableOpacity style={styles.retakeButton}>
              <Text style={[styles.retakeText, { color: colors.primary }]}>Retake Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions ⚡</Text>
          
          <View style={styles.actionGrid}>
            <TouchableOpacity 
              style={[styles.actionCard, styles.analyzeCard]}
              onPress={handleStartAnalysis}
            >
              <Camera size={24} color="#fff" />
              <Text style={styles.actionTitle}>Skin Analysis</Text>
              <Text style={styles.actionSubtitle}>Check your glow</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, styles.routineCard]}
              onPress={handleViewRoutine}
            >
              <TrendingUp size={24} color="#fff" />
              <Text style={styles.actionTitle}>My Routine</Text>
              <Text style={styles.actionSubtitle}>Today's steps</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionCard, styles.trackCard]}>
              <Calendar size={24} color="#fff" />
              <Text style={styles.actionTitle}>Track Progress</Text>
              <Text style={styles.actionSubtitle}>Log your day</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, styles.chatCard]}
              onPress={() => router.push('/(tabs)/chat')}
            >
              <Sparkles size={24} color="#fff" />
              <Text style={styles.actionTitle}>Glow Coach</Text>
              <Text style={styles.actionSubtitle}>Ask questions</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Routine Preview */}
        <View style={styles.routinePreview}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Routine 🌅</Text>
            <TouchableOpacity onPress={handleViewRoutine}>
              <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.routineSteps, { backgroundColor: colors.surface }]}>
            <View style={styles.routineStep}>
              <View style={[styles.stepIndicator, styles.completedStep]} />
              <Text style={[styles.stepText, { color: colors.text }]}>Gentle Cleanser</Text>
              <Text style={[styles.stepStatus, { color: colors.textSecondary }]}>✓ Done</Text>
            </View>
            
            <View style={styles.routineStep}>
              <View style={[styles.stepIndicator, styles.pendingStep]} />
              <Text style={[styles.stepText, { color: colors.text }]}>Vitamin C Serum</Text>
              <Text style={[styles.stepStatus, { color: colors.textSecondary }]}>⏰ Next</Text>
            </View>
            
            <View style={styles.routineStep}>
              <View style={[styles.stepIndicator, { backgroundColor: colors.border }]} />
              <Text style={[styles.stepText, { color: colors.text }]}>Moisturizer + SPF</Text>
              <Text style={[styles.stepStatus, { color: colors.textSecondary }]}>⏰ Later</Text>
            </View>
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendations}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>For You ✨</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.recommendationScroll}
          >
            <View style={[styles.recommendationCard, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.productImage}
              />
              <View style={styles.matchBadge}>
                <Text style={styles.matchText}>94% Match</Text>
              </View>
              <Text style={[styles.productName, { color: colors.text }]}>Hydrating Cleanser</Text>
              <Text style={[styles.productBrand, { color: colors.textSecondary }]}>GlowUp Essentials</Text>
              <View style={styles.productBadges}>
                <Text style={[styles.badge, { backgroundColor: colors.surfaceSecondary }]}>🌿 Vegan</Text>
                <Text style={[styles.badge, { backgroundColor: colors.surfaceSecondary }]}>🧴 Fragrance-free</Text>
              </View>
            </View>

            <View style={[styles.recommendationCard, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.productImage}
              />
              <View style={styles.matchBadge}>
                <Text style={styles.matchText}>89% Match</Text>
              </View>
              <Text style={[styles.productName, { color: colors.text }]}>Niacinamide Serum</Text>
              <Text style={[styles.productBrand, { color: colors.textSecondary }]}>GlowUp Science</Text>
              <View style={styles.productBadges}>
                <Text style={[styles.badge, { backgroundColor: colors.surfaceSecondary }]}>💧 Hydrating</Text>
                <Text style={[styles.badge, { backgroundColor: colors.surfaceSecondary }]}>✨ Brightening</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Motivation Section */}
        <LinearGradient
          colors={['#B8F2D6', '#A7F3D0']}
          style={styles.motivationCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[styles.motivationTitle, { color: colors.text }]}>You're glowing! 🌟</Text>
          <Text style={[styles.motivationText, { color: colors.textSecondary }]}>
            Your skin is looking better every day. Keep up the amazing work!
          </Text>
          <TouchableOpacity style={[styles.motivationButton, { backgroundColor: colors.background }]}>
            <Text style={[styles.motivationButtonText, { color: colors.text }]}>Track My Glow ✨</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
  },
  subGreeting: {
    fontSize: 16,
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  streakCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
  },
  streakContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
  },
  streakLabel: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  skinTypeCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
  },
  skinTypeLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  skinTypeValue: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  retakeButton: {
    alignSelf: 'flex-start',
  },
  retakeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  analyzeCard: {
    backgroundColor: '#E8D5FF',
  },
  routineCard: {
    backgroundColor: '#B8F2D6',
  },
  trackCard: {
    backgroundColor: '#FFD4C4',
  },
  chatCard: {
    backgroundColor: '#FDE68A',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
    textAlign: 'center',
    opacity: 0.9,
  },
  routinePreview: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  routineSteps: {
    borderRadius: 16,
    padding: 16,
  },
  routineStep: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  stepIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  completedStep: {
    backgroundColor: '#10b981',
  },
  pendingStep: {
    backgroundColor: '#f59e0b',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  stepStatus: {
    fontSize: 12,
  },
  recommendations: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  recommendationScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  recommendationCard: {
    width: 160,
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  matchBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  matchText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 12,
    marginBottom: 8,
  },
  productBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  badge: {
    fontSize: 10,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  motivationCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 30,
  },
  motivationTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  motivationText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  motivationButton: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  motivationButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});