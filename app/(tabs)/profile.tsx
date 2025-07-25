import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useAuth } from '@/contexts/AuthContext';
import { User, Settings, Calendar, Award, Camera, Bell, Moon, CircleHelp as HelpCircle, LogOut, ChevronRight, Star, Target, Zap, CreditCard as Edit3, Share2 } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function ProfileScreen() {
  const { isDarkMode, toggleDarkMode, colors } = useTheme();
  const { signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [progressTracking, setProgressTracking] = useState(true);

  const skinJourneyStats = {
    daysStreak: 14,
    routinesCompleted: 42,
    productsTriedRated: 18,
    skinImprovement: 85,
  };

  const achievements = [
    { id: 1, name: '7-Day Streak', icon: '🔥', earned: true },
    { id: 2, name: 'Product Explorer', icon: '🧴', earned: true },
    { id: 3, name: 'Glow Getter', icon: '✨', earned: false },
    { id: 4, name: 'Skincare Guru', icon: '🧙‍♀️', earned: false },
  ];

  const handleSignOut = async () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      await signOut();
      router.replace('/auth');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Profile 👤</Text>
          <TouchableOpacity style={[styles.settingsButton, { backgroundColor: colors.surface }]}>
            <Settings size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <LinearGradient
          colors={['#E8D5FF', '#D8B4FE']}
          style={styles.profileCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editAvatarButton}>
                <Camera size={12} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Sarah Chen ✨</Text>
              <Text style={styles.userSkinType}>Combination Skin</Text>
              <Text style={styles.joinDate}>Glowing since Dec 2024</Text>
            </View>
            
            <TouchableOpacity style={styles.editProfileButton}>
              <Edit3 size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Journey Stats */}
        <View style={styles.statsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Glow Journey 📈</Text>
          
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.statNumber, { color: colors.text }]}>{skinJourneyStats.daysStreak}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Day Streak</Text>
              <Text style={styles.statIcon}>🔥</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.statNumber, { color: colors.text }]}>{skinJourneyStats.routinesCompleted}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Routines</Text>
              <Text style={styles.statIcon}>✅</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.statNumber, { color: colors.text }]}>{skinJourneyStats.productsTriedRated}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Products</Text>
              <Text style={styles.statIcon}>🧴</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.statNumber, { color: colors.text }]}>{skinJourneyStats.skinImprovement}%</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Improvement</Text>
              <Text style={styles.statIcon}>📊</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Achievements 🏆</Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.achievementsList}>
              {achievements.map((achievement) => (
                <View 
                  key={achievement.id} 
                  style={[
                    styles.achievementCard,
                    { backgroundColor: colors.surface },
                    !achievement.earned && styles.lockedAchievement
                  ]}
                >
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <Text style={[
                    styles.achievementName,
                    { color: achievement.earned ? colors.text : colors.textTertiary }
                  ]}>
                    {achievement.name}
                  </Text>
                  {achievement.earned && (
                    <View style={styles.earnedBadge}>
                      <Star size={12} color="#FFD700" fill="#FFD700" />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions ⚡</Text>
          
          <View style={styles.actionGrid}>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.surface }]}>
              <Calendar size={24} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.text }]}>Track Progress</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.surface }]}>
              <Target size={24} color={colors.secondary} />
              <Text style={[styles.actionText, { color: colors.text }]}>Set Goals</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.surface }]}>
              <Share2 size={24} color={colors.accent} />
              <Text style={[styles.actionText, { color: colors.text }]}>Share Journey</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.surface }]}>
              <Zap size={24} color={colors.warning} />
              <Text style={[styles.actionText, { color: colors.text }]}>Skin Analysis</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings ⚙️</Text>
          
          <View style={[styles.settingsGroup, { backgroundColor: colors.surface }]}>
            <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.border }]}>
              <View style={styles.settingLeft}>
                <Bell size={20} color={colors.textSecondary} />
                <Text style={[styles.settingText, { color: colors.text }]}>Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={notifications ? '#fff' : '#f4f3f4'}
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.border }]}>
              <View style={styles.settingLeft}>
                <Moon size={20} color={colors.textSecondary} />
                <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.border }]}>
              <View style={styles.settingLeft}>
                <Target size={20} color={colors.textSecondary} />
                <Text style={[styles.settingText, { color: colors.text }]}>Progress Tracking</Text>
              </View>
              <Switch
                value={progressTracking}
                onValueChange={setProgressTracking}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={progressTracking ? '#fff' : '#f4f3f4'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface }]}>
            <View style={styles.menuLeft}>
              <User size={20} color={colors.textSecondary} />
              <Text style={[styles.menuText, { color: colors.text }]}>Account Settings</Text>
            </View>
            <ChevronRight size={16} color={colors.textTertiary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface }]}>
            <View style={styles.menuLeft}>
              <HelpCircle size={20} color={colors.textSecondary} />
              <Text style={[styles.menuText, { color: colors.text }]}>Help & Support</Text>
            </View>
            <ChevronRight size={16} color={colors.textTertiary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface }]}>
            <View style={styles.menuLeft}>
              <Settings size={20} color={colors.textSecondary} />
              <Text style={[styles.menuText, { color: colors.text }]}>Privacy & Data</Text>
            </View>
            <ChevronRight size={16} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Motivation Section */}
        <LinearGradient
          colors={['#B8F2D6', '#A7F3D0']}
          style={styles.motivationCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[styles.motivationTitle, { color: colors.text }]}>Keep Glowing! ✨</Text>
          <Text style={[styles.motivationText, { color: colors.textSecondary }]}>
            You're doing amazing! Your skin has improved by 85% this month. 
            Keep up your routine to reach your goals! 🌟
          </Text>
          <TouchableOpacity style={[styles.motivationButton, { backgroundColor: colors.background }]}>
            <Text style={[styles.motivationButtonText, { color: colors.text }]}>View Progress Details</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <LogOut size={16} color={colors.error} />
          <Text style={[styles.signOutText, { color: colors.error }]}>Sign Out</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 12,
  },
  profileCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 6,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  userSkinType: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 2,
  },
  joinDate: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  editProfileButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '48%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 20,
    position: 'absolute',
    top: 12,
    right: 12,
  },
  achievementsContainer: {
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
  achievementsList: {
    flexDirection: 'row',
    paddingLeft: 20,
    gap: 12,
  },
  achievementCard: {
    width: 100,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    position: 'relative',
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
  earnedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 2,
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
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
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  settingsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  settingsGroup: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
  },
  motivationCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
  },
  motivationTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  motivationText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  motivationButton: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  motivationButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 16,
    gap: 8,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});