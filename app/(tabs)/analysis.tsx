import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { 
  Camera, 
  FileText, 
  ArrowRight, 
  Sparkles,
  RotateCcw,
  Check,
  TrendingUp
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function AnalysisScreen() {
  const { colors } = useTheme();
  const [selectedOption, setSelectedOption] = useState<'quiz' | 'camera' | null>(null);
  const [currentQuizStep, setCurrentQuizStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<any[]>([]);
  
  const progressAnim = useRef(new Animated.Value(0)).current;
  const resultAnim = useRef(new Animated.Value(0)).current;

  const quizQuestions = [
    {
      id: 1,
      question: "How does your skin feel by midday?",
      emoji: "🌅",
      options: [
        { text: "Oily all over", value: "oily" },
        { text: "Dry and tight", value: "dry" },
        { text: "Oily T-zone, normal cheeks", value: "combination" },
        { text: "Comfortable and balanced", value: "normal" }
      ]
    },
    {
      id: 2,
      question: "How does your skin react to new products?",
      emoji: "🧴",
      options: [
        { text: "Gets irritated easily", value: "sensitive" },
        { text: "Usually fine, no issues", value: "normal" },
        { text: "Sometimes breaks out", value: "acne-prone" },
        { text: "Depends on the product", value: "combination" }
      ]
    },
    {
      id: 3,
      question: "What's your biggest skin concern?",
      emoji: "🎯",
      options: [
        { text: "Acne and breakouts", value: "acne" },
        { text: "Dryness and flaking", value: "dryness" },
        { text: "Oiliness and shine", value: "oiliness" },
        { text: "Sensitivity and redness", value: "sensitivity" }
      ]
    }
  ];

  const handleOptionSelect = (option: 'quiz' | 'camera') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedOption(option);
    if (option === 'camera') {
      router.push('/camera?mode=analysis');
    } else {
      // Start quiz
    }
  };

  const startCameraAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate camera analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      animateResults();
    }, 3000);
  };

  const handleQuizAnswer = (answer: any) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);
    
    if (currentQuizStep < quizQuestions.length - 1) {
      setCurrentQuizStep(currentQuizStep + 1);
      animateProgress();
    } else {
      // Quiz completed
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
        animateResults();
      }, 2000);
    }
  };

  const animateProgress = () => {
    Animated.timing(progressAnim, {
      toValue: (currentQuizStep + 1) / quizQuestions.length,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const animateResults = () => {
    Animated.timing(resultAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const resetAnalysis = () => {
    setSelectedOption(null);
    setCurrentQuizStep(0);
    setIsAnalyzing(false);
    setShowResults(false);
    setQuizAnswers([]);
    progressAnim.setValue(0);
    resultAnim.setValue(0);
  };

  if (showResults) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Animated.View style={[styles.resultsContainer, { opacity: resultAnim }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.resultsHeader}>
              <Text style={[styles.resultsTitle, { color: colors.text }]}>Your Glow Analysis ✨</Text>
              <TouchableOpacity onPress={resetAnalysis} style={styles.retakeButton}>
                <RotateCcw size={16} color={colors.primary} />
                <Text style={[styles.retakeText, { color: colors.primary }]}>Retake Analysis</Text>
              </TouchableOpacity>
            </View>

            {/* Skin Type Result */}
            <LinearGradient
              colors={['#E8D5FF', '#D8B4FE']}
              style={styles.skinTypeCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.skinTypeLabel}>Your Skin Type</Text>
              <Text style={styles.skinTypeResult}>Combination Skin</Text>
              <Text style={styles.skinTypeDescription}>
                Oily T-zone with normal to dry cheeks. You need balanced care! 🌿
              </Text>
            </LinearGradient>

            {/* Health Metrics */}
            <View style={styles.metricsContainer}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Skin Health Metrics 📊</Text>
              
              <View style={[styles.metricCard, { backgroundColor: colors.surface }]}>
                <View style={styles.metricHeader}>
                  <Text style={[styles.metricName, { color: colors.text }]}>Hydration Level</Text>
                  <Text style={[styles.metricScore, { color: colors.primary }]}>72%</Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.progressFill, { width: '72%', backgroundColor: colors.primary }]} />
                </View>
              </View>

              <View style={[styles.metricCard, { backgroundColor: colors.surface }]}>
                <View style={styles.metricHeader}>
                  <Text style={[styles.metricName, { color: colors.text }]}>Oil Production</Text>
                  <Text style={[styles.metricScore, { color: colors.primary }]}>68%</Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.progressFill, { width: '68%', backgroundColor: colors.primary }]} />
                </View>
              </View>

              <View style={[styles.metricCard, { backgroundColor: colors.surface }]}>
                <View style={styles.metricHeader}>
                  <Text style={[styles.metricName, { color: colors.text }]}>Skin Sensitivity</Text>
                  <Text style={[styles.metricScore, { color: colors.primary }]}>45%</Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.progressFill, { width: '45%', backgroundColor: colors.primary }]} />
                </View>
              </View>
            </View>

            {/* Recommendations */}
            <View style={styles.recommendationsSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Perfect Ingredients for You 🧪</Text>
              
              <View style={styles.ingredientGrid}>
                <View style={[styles.ingredientCard, { backgroundColor: colors.surface }]}>
                  <Text style={styles.ingredientEmoji}>💧</Text>
                  <Text style={[styles.ingredientName, { color: colors.text }]}>Hyaluronic Acid</Text>
                  <Text style={[styles.ingredientBenefit, { color: colors.textSecondary }]}>Deep hydration</Text>
                </View>
                
                <View style={[styles.ingredientCard, { backgroundColor: colors.surface }]}>
                  <Text style={styles.ingredientEmoji}>🌿</Text>
                  <Text style={[styles.ingredientName, { color: colors.text }]}>Niacinamide</Text>
                  <Text style={[styles.ingredientBenefit, { color: colors.textSecondary }]}>Oil control</Text>
                </View>
                
                <View style={[styles.ingredientCard, { backgroundColor: colors.surface }]}>
                  <Text style={styles.ingredientEmoji}>✨</Text>
                  <Text style={[styles.ingredientName, { color: colors.text }]}>Ceramides</Text>
                  <Text style={[styles.ingredientBenefit, { color: colors.textSecondary }]}>Barrier repair</Text>
                </View>
                
                <View style={[styles.ingredientCard, { backgroundColor: colors.surface }]}>
                  <Text style={styles.ingredientEmoji}>🌸</Text>
                  <Text style={[styles.ingredientName, { color: colors.text }]}>Peptides</Text>
                  <Text style={[styles.ingredientBenefit, { color: colors.textSecondary }]}>Anti-aging</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.primaryActionButton, { backgroundColor: colors.primary }]}>
                <Text style={styles.primaryActionText}>Get Product Recommendations</Text>
                <ArrowRight size={16} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.secondaryActionButton, { backgroundColor: colors.surface }]}>
                <Text style={[styles.secondaryActionText, { color: colors.text }]}>Build My Routine</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    );
  }

  if (isAnalyzing) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.analyzingContainer}>
          <Sparkles size={60} color={colors.primary} />
          <Text style={[styles.analyzingTitle, { color: colors.text }]}>Analyzing your glow...</Text>
          <Text style={[styles.analyzingSubtitle, { color: colors.textSecondary }]}>
            Our AI is working its magic ✨
          </Text>
          <View style={styles.loadingDots}>
            <View style={[styles.dot, styles.dot1, { backgroundColor: colors.primary }]} />
            <View style={[styles.dot, styles.dot2, { backgroundColor: colors.primary }]} />
            <View style={[styles.dot, styles.dot3, { backgroundColor: colors.primary }]} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (selectedOption === 'quiz') {
    const currentQuestion = quizQuestions[currentQuizStep];
    
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.quizContainer}>
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
              <Animated.View 
                style={[
                  styles.progressBar, 
                  { backgroundColor: colors.primary },
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.textSecondary }]}>
              {currentQuizStep + 1} of {quizQuestions.length}
            </Text>
          </View>

          {/* Question */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionEmoji}>{currentQuestion.emoji}</Text>
            <Text style={[styles.questionText, { color: colors.text }]}>
              {currentQuestion.question}
            </Text>
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.optionCard, { backgroundColor: colors.surface }]}
                onPress={() => handleQuizAnswer(option)}
              >
                <Text style={[styles.optionText, { color: colors.text }]}>{option.text}</Text>
                <ArrowRight size={16} color={colors.textTertiary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Skin Analysis 🔬</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Let's understand your skin better and find your perfect routine
          </Text>
        </View>

        {/* Analysis Options */}
        <View style={styles.optionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Choose Your Analysis Method</Text>
          
          <TouchableOpacity
            style={styles.analysisOption}
            onPress={() => handleOptionSelect('quiz')}
          >
            <LinearGradient
              colors={['#E8D5FF', '#D8B4FE']}
              style={styles.optionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.optionContent}>
                <FileText size={32} color="#fff" />
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>Skin Quiz</Text>
                  <Text style={styles.optionDescription}>
                    Answer a few questions about your skin
                  </Text>
                  <Text style={styles.optionDuration}>⏱️ 2 minutes</Text>
                </View>
                <ArrowRight size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.analysisOption}
            onPress={() => handleOptionSelect('camera')}
          >
            <LinearGradient
              colors={['#B8F2D6', '#A7F3D0']}
              style={styles.optionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.optionContent}>
                <Camera size={32} color="#fff" />
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>Selfie Scan</Text>
                  <Text style={styles.optionDescription}>
                    Take a selfie for AI skin analysis
                  </Text>
                  <Text style={styles.optionDuration}>📱 30 seconds</Text>
                </View>
                <ArrowRight size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>What You'll Get 🎁</Text>
          
          <View style={[styles.featuresList, { backgroundColor: colors.surface }]}>
            <View style={styles.featureItem}>
              <Check size={20} color={colors.success} />
              <Text style={[styles.featureText, { color: colors.text }]}>Personalized skin type identification</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Check size={20} color={colors.success} />
              <Text style={[styles.featureText, { color: colors.text }]}>Custom product recommendations</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Check size={20} color={colors.success} />
              <Text style={[styles.featureText, { color: colors.text }]}>Ingredient suggestions for your skin</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Check size={20} color={colors.success} />
              <Text style={[styles.featureText, { color: colors.text }]}>Tailored skincare routine</Text>
            </View>
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Pro Tips 💡</Text>
          
          <View style={[styles.tipCard, { backgroundColor: colors.surface }]}>
            <Text style={styles.tipEmoji}>🌅</Text>
            <View>
              <Text style={[styles.tipTitle, { color: colors.text }]}>Best Time for Analysis</Text>
              <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                Morning or evening when your skin is clean and makeup-free
              </Text>
            </View>
          </View>
          
          <View style={[styles.tipCard, { backgroundColor: colors.surface }]}>
            <Text style={styles.tipEmoji}>💡</Text>
            <View>
              <Text style={[styles.tipTitle, { color: colors.text }]}>Good Lighting</Text>
              <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                Use natural light or bright indoor lighting for accurate results
              </Text>
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  optionsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  analysisOption: {
    marginBottom: 16,
  },
  optionGradient: {
    borderRadius: 16,
    padding: 20,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  optionDuration: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featuresList: {
    borderRadius: 16,
    padding: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  tipsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  tipEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 12,
    lineHeight: 16,
  },
  quizContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  questionEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 28,
  },
  optionsContainer: {
    flex: 1,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  analyzingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  analyzingTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
  },
  analyzingSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dot1: {
    animationDelay: '0s',
  },
  dot2: {
    animationDelay: '0.2s',
  },
  dot3: {
    animationDelay: '0.4s',
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  retakeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  skinTypeCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
  },
  skinTypeLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  skinTypeResult: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  skinTypeDescription: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 22,
  },
  metricsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  metricCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricName: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricScore: {
    fontSize: 16,
    fontWeight: '700',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  recommendationsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  ingredientGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  ingredientCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  ingredientEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  ingredientName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  ingredientBenefit: {
    fontSize: 12,
    textAlign: 'center',
  },
  actionButtons: {
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  primaryActionButton: {
    borderRadius: 25,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryActionButton: {
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryActionText: {
    fontSize: 16,
    fontWeight: '600',
  },
});