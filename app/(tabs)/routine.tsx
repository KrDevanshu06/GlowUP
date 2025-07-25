import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sun, Moon, Plus, Download, QrCode, Calendar, Bell, CircleDot as DragHandleDots2, Check, Star, Clock } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import * as Haptics from 'expo-haptics';

export default function RoutineScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'AM' | 'PM'>('AM');
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [showProgressModal, setShowProgressModal] = useState(false);

  const amRoutine = [
    {
      id: 1,
      name: 'Gentle Cleanser',
      brand: 'GlowUp Essentials',
      completed: true,
      time: '7:00 AM',
      order: 1,
    },
    {
      id: 2,
      name: 'Vitamin C Serum',
      brand: 'Bright & Beautiful',
      completed: false,
      time: '7:05 AM',
      order: 2,
    },
    {
      id: 3,
      name: 'Hyaluronic Acid',
      brand: 'Hydra Boost',
      completed: false,
      time: '7:10 AM',
      order: 3,
    },
    {
      id: 4,
      name: 'Moisturizer + SPF 30',
      brand: 'Sun Guardian',
      completed: false,
      time: '7:15 AM',
      order: 4,
    },
  ];

  const pmRoutine = [
    {
      id: 5,
      name: 'Oil Cleanser',
      brand: 'Deep Clean Co',
      completed: false,
      time: '9:00 PM',
      order: 1,
    },
    {
      id: 6,
      name: 'Gentle Cleanser',
      brand: 'GlowUp Essentials',
      completed: false,
      time: '9:05 PM',
      order: 2,
    },
    {
      id: 7,
      name: 'Retinol Serum',
      brand: 'Age Reverse',
      completed: false,
      time: '9:10 PM',
      order: 3,
    },
    {
      id: 8,
      name: 'Night Moisturizer',
      brand: 'Overnight Repair',
      completed: false,
      time: '9:15 PM',
      order: 4,
    },
  ];

  const currentRoutine = activeTab === 'AM' ? amRoutine : pmRoutine;

  const handleDownloadQR = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Generate QR code logic
    alert('QR Code generated! Share your routine with friends ✨');
  };

  const handleDownloadPDF = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Generate PDF logic
    alert('PDF downloaded! Check your downloads folder 📄');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>My Routine 📅</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface }]} onPress={handleDownloadQR}>
              <QrCode size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface }]} onPress={handleDownloadPDF}>
              <Download size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <View style={[styles.tabSelector, { backgroundColor: colors.surface }]}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'AM' && { backgroundColor: colors.primary }]}
              onPress={() => setActiveTab('AM')}
            >
              <Sun size={20} color={activeTab === 'AM' ? 'white' : colors.textSecondary} />
              <Text style={[
                styles.tabText, 
                { color: activeTab === 'AM' ? 'white' : colors.textSecondary }
              ]}>
                Morning
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tab, activeTab === 'PM' && { backgroundColor: colors.primary }]}
              onPress={() => setActiveTab('PM')}
            >
              <Moon size={20} color={activeTab === 'PM' ? 'white' : colors.textSecondary} />
              <Text style={[
                styles.tabText, 
                { color: activeTab === 'PM' ? 'white' : colors.textSecondary }
              ]}>
                Evening
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Routine Stats */}
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={['#E8D5FF', '#D8B4FE']}
            style={styles.statCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Steps</Text>
          </LinearGradient>
          
          <LinearGradient
            colors={['#B8F2D6', '#A7F3D0']}
            style={styles.statCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </LinearGradient>
          
          <LinearGradient
            colors={['#FFD4C4', '#FDE68A']}
            style={styles.statCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statNumber}>25%</Text>
            <Text style={styles.statLabel}>Complete</Text>
          </LinearGradient>
        </View>

        {/* Routine Steps */}
        <View style={styles.routineContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {activeTab} Routine {activeTab === 'AM' ? '🌅' : '🌙'}
            </Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={16} color={colors.primary} />
              <Text style={[styles.addButtonText, { color: colors.primary }]}>Add Step</Text>
            </TouchableOpacity>
          </View>

          {currentRoutine.map((step, index) => (
            <View key={step.id} style={[styles.routineStep, { backgroundColor: colors.surface }]}>
              <View style={styles.stepContent}>
                <View style={styles.stepLeft}>
                  <TouchableOpacity style={[
                    styles.checkbox, 
                    { borderColor: colors.border },
                    step.completed && { backgroundColor: colors.success, borderColor: colors.success }
                  ]}>
                    {step.completed && <Check size={16} color="#fff" />}
                  </TouchableOpacity>
                  <View style={styles.stepInfo}>
                    <Text style={[
                      styles.stepName, 
                      { color: step.completed ? colors.textTertiary : colors.text },
                      step.completed && { textDecorationLine: 'line-through' }
                    ]}>
                      {step.name}
                    </Text>
                    <Text style={[styles.stepBrand, { color: colors.textSecondary }]}>{step.brand}</Text>
                    <View style={styles.stepMeta}>
                      <Clock size={12} color={colors.textTertiary} />
                      <Text style={[styles.stepTime, { color: colors.textTertiary }]}>{step.time}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.stepRight}>
                  <TouchableOpacity style={styles.dragHandle}>
                    <DragHandleDots2 size={16} color={colors.border} />
                  </TouchableOpacity>
                </View>
              </View>
              
              {index < currentRoutine.length - 1 && <View style={[styles.stepDivider, { backgroundColor: colors.border }]} />}
            </View>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.settingsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings ⚙️</Text>
          
          <View style={[styles.settingItem, { backgroundColor: colors.surface }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Daily Reminders</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Get notified for your skincare routine
              </Text>
            </View>
            <Switch
              value={remindersEnabled}
              onValueChange={setRemindersEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={remindersEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.surface }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Routine Goal</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Complete routine 7 days in a row
              </Text>
            </View>
            <View style={styles.settingAction}>
              <Star size={16} color={colors.accent} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Progress Tracker */}
        <TouchableOpacity 
          style={styles.progressTracker}
          onPress={() => setShowProgressModal(true)}
        >
          <LinearGradient
            colors={['#E8D5FF', '#B8F2D6']}
            style={styles.progressGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.progressContent}>
              <View>
                <Text style={styles.progressTitle}>Track My Glow ✨</Text>
                <Text style={styles.progressSubtitle}>
                  See your skincare journey progress
                </Text>
              </View>
              <Calendar size={24} color="#fff" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Export Options */}
        <View style={styles.exportContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Share Your Routine 📤</Text>
          
          <View style={styles.exportGrid}>
            <TouchableOpacity style={[styles.exportOption, { backgroundColor: colors.surface }]} onPress={handleDownloadPDF}>
              <Download size={24} color={colors.primary} />
              <Text style={[styles.exportText, { color: colors.text }]}>Download PDF</Text>
              <Text style={[styles.exportSubtext, { color: colors.textSecondary }]}>Save as document</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.exportOption, { backgroundColor: colors.surface }]} onPress={handleDownloadQR}>
              <QrCode size={24} color={colors.secondary} />
              <Text style={[styles.exportText, { color: colors.text }]}>Generate QR Code</Text>
              <Text style={[styles.exportSubtext, { color: colors.textSecondary }]}>Quick sharing</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.primary }]}>
            <Text style={styles.primaryButtonText}>Start Today's Routine</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.secondaryButton, { backgroundColor: colors.surface }]}>
            <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Customize Routine</Text>
          </TouchableOpacity>
        </View>
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
  },
  tabContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabSelector: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  routineContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  routineStep: {
    borderRadius: 16,
    marginBottom: 8,
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  stepLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepInfo: {
    flex: 1,
  },
  stepName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepBrand: {
    fontSize: 12,
    marginBottom: 4,
  },
  stepMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stepTime: {
    fontSize: 12,
  },
  stepRight: {
    alignItems: 'center',
  },
  dragHandle: {
    padding: 8,
  },
  stepDivider: {
    height: 1,
    marginHorizontal: 16,
  },
  settingsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  settingAction: {
    padding: 4,
  },
  progressTracker: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  progressGradient: {
    borderRadius: 16,
    padding: 20,
  },
  progressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  exportContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  exportGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  exportOption: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  exportText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  exportSubtext: {
    fontSize: 12,
    textAlign: 'center',
  },
  actionButtons: {
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  primaryButton: {
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryButton: {
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});