import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Send, 
  Mic, 
  Sparkles, 
  User,
  Bot,
  Settings,
  Star,
  Heart,
  Smile
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
};

type CoachPersonality = 'guru' | 'minimalist' | 'bestie';

export default function ChatScreen() {
  const { colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState<CoachPersonality>('guru');
  const [showPersonalitySelector, setShowPersonalitySelector] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);

  const personalities = {
    guru: {
      name: 'Glow Guru',
      emoji: '✨',
      description: 'Wise and knowledgeable',
      color: '#E8D5FF',
    },
    minimalist: {
      name: 'Minimalist Queen',
      emoji: '🌿',
      description: 'Simple and effective',
      color: '#B8F2D6',
    },
    bestie: {
      name: 'Skincare Bestie',
      emoji: '💕',
      description: 'Fun and supportive',
      color: '#FFD4C4',
    },
  };

  const quickSuggestions = [
    "Is this product safe for oily skin?",
    "What's the best routine for sensitive skin?",
    "How often should I use retinol?",
    "Can I mix vitamin C with niacinamide?",
    "Help me build a morning routine",
    "What causes acne breakouts?",
  ];

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: getWelcomeMessage(),
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "Analyze my skin type",
        "Product recommendations",
        "Build a routine",
        "Skincare tips"
      ],
    };
    setMessages([welcomeMessage]);
  }, [selectedPersonality]);

  const getWelcomeMessage = () => {
    switch (selectedPersonality) {
      case 'guru':
        return "✨ Welcome, beautiful soul! I'm your Glow Guru, here to share the ancient wisdom of skincare. What mysteries of your skin shall we uncover today?";
      case 'minimalist':
        return "🌿 Hey! I'm your Minimalist Queen. Let's keep things simple and effective. What skincare question can I help you with?";
      case 'bestie':
        return "💕 OMG hey babe! Your Skincare Bestie is here! Ready to spill all the tea about glowing skin? What's on your mind?";
      default:
        return "Hi! How can I help you with your skincare today?";
    }
  };

  const getResponseForPersonality = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('oily skin')) {
      switch (selectedPersonality) {
        case 'guru':
          return "Ah, the blessing of oily skin! ✨ Your skin produces natural oils that keep you looking youthful. Look for gentle cleansers with salicylic acid, niacinamide serums to balance oil production, and lightweight, non-comedogenic moisturizers. Remember, even oily skin needs hydration!";
        case 'minimalist':
          return "🌿 Oily skin routine: gentle cleanser morning + night, niacinamide serum (AM), lightweight moisturizer, SPF 30+. That's it. Less is more.";
        case 'bestie':
          return "💕 Girl, oily skin is actually a blessing in disguise! You'll age slower! Try a gentle cleanser (no harsh scrubs!), a niacinamide serum to control oil, and don't skip moisturizer - your skin needs it!";
        default:
          return "For oily skin, I recommend gentle cleansing, oil-controlling serums, and lightweight moisturizers.";
      }
    }
    
    if (lowerMessage.includes('routine') || lowerMessage.includes('morning') || lowerMessage.includes('evening')) {
      switch (selectedPersonality) {
        case 'guru':
          return "✨ A sacred morning ritual: cleanse gently, apply vitamin C serum for protection, moisturize with intention, and seal with SPF 30+. Evening: cleanse thoroughly, apply treatments (retinol 2-3x/week), nourish with night moisturizer. Consistency is the key to transformation.";
        case 'minimalist':
          return "🌿 AM: cleanser, vitamin C, moisturizer, SPF. PM: cleanser, treatment (retinol 2x/week), moisturizer. Build slowly, stay consistent.";
        case 'bestie':
          return "💕 Okay babe, let's build you the perfect routine! Morning: gentle cleanser, vitamin C glow serum, moisturizer, and NEVER skip SPF! Evening: double cleanse, maybe some retinol (start slow!), and a nice thick night cream. You got this!";
        default:
          return "A basic routine includes cleansing, treating, moisturizing, and sun protection.";
      }
    }
    
    // Default responses
    switch (selectedPersonality) {
      case 'guru':
        return "✨ Your question holds wisdom within. Could you share more details so I can guide you on your skincare journey?";
      case 'minimalist':
        return "🌿 I need a bit more info to give you the best simple solution. What specific concern are you dealing with?";
      case 'bestie':
        return "💕 Tell me more babe! I want to help you get that glow but need some deets first!";
      default:
        return "I'd love to help! Could you provide more details about your skincare concern?";
    }
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponseForPersonality(text),
        isUser: false,
        timestamp: new Date(),
        suggestions: Math.random() > 0.5 ? [
          "Tell me more",
          "Product recommendations",
          "Another question"
        ] : undefined,
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionPress = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={[styles.avatarContainer, { backgroundColor: personalities[selectedPersonality].color }]}>
              <Text style={styles.avatarEmoji}>{personalities[selectedPersonality].emoji}</Text>
            </View>
            <View>
              <Text style={[styles.coachName, { color: colors.text }]}>{personalities[selectedPersonality].name}</Text>
              <Text style={[styles.coachStatus, { color: colors.textSecondary }]}>Online • Ready to help ✨</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.settingsButton, { backgroundColor: colors.surface }]}
            onPress={() => setShowPersonalitySelector(!showPersonalitySelector)}
          >
            <Settings size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Personality Selector */}
        {showPersonalitySelector && (
          <View style={[styles.personalitySelector, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
            <Text style={[styles.personalitySelectorTitle, { color: colors.text }]}>Choose Your Coach 💫</Text>
            <View style={styles.personalityOptions}>
              {Object.entries(personalities).map(([key, personality]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.personalityOption,
                    { backgroundColor: personality.color },
                    selectedPersonality === key && styles.selectedPersonality
                  ]}
                  onPress={() => {
                    setSelectedPersonality(key as CoachPersonality);
                    setShowPersonalitySelector(false);
                  }}
                >
                  <Text style={styles.personalityEmoji}>{personality.emoji}</Text>
                  <Text style={[styles.personalityName, { color: colors.text }]}>{personality.name}</Text>
                  <Text style={[styles.personalityDescription, { color: colors.textSecondary }]}>{personality.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Quick Suggestions */}
        {messages.length <= 1 && (
          <View style={styles.suggestionsContainer}>
            <Text style={[styles.suggestionsTitle, { color: colors.text }]}>Popular Questions 💭</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.suggestionsList}>
                {quickSuggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.suggestionChip, { backgroundColor: colors.surface }]}
                    onPress={() => handleSuggestionPress(suggestion)}
                  >
                    <Text style={[styles.suggestionText, { color: colors.text }]}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message) => (
            <View key={message.id} style={styles.messageWrapper}>
              <View style={[
                styles.messageContainer,
                message.isUser ? styles.userMessage : styles.botMessage
              ]}>
                {!message.isUser && (
                  <View style={[styles.botAvatar, { backgroundColor: personalities[selectedPersonality].color }]}>
                    <Bot size={16} color="white" />
                  </View>
                )}
                
                <View style={[
                  styles.messageBubble,
                  message.isUser ? { backgroundColor: colors.primary } : { backgroundColor: colors.surface }
                ]}>
                  <Text style={[
                    styles.messageText,
                    message.isUser ? { color: 'white' } : { color: colors.text }
                  ]}>
                    {message.text}
                  </Text>
                </View>
                
                {message.isUser && (
                  <View style={[styles.userAvatar, { backgroundColor: colors.primary }]}>
                    <User size={16} color="white" />
                  </View>
                )}
              </View>
              
              {/* Message Suggestions */}
              {message.suggestions && (
                <View style={styles.messageSuggestions}>
                  {message.suggestions.map((suggestion, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.messageSuggestionChip, { backgroundColor: colors.surface, borderColor: colors.border }]}
                      onPress={() => handleSuggestionPress(suggestion)}
                    >
                      <Text style={[styles.messageSuggestionText, { color: colors.textSecondary }]}>{suggestion}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <View style={[styles.messageContainer, styles.botMessage]}>
              <View style={[styles.botAvatar, { backgroundColor: personalities[selectedPersonality].color }]}>
                <Bot size={16} color="white" />
              </View>
              <View style={[styles.messageBubble, { backgroundColor: colors.surface }, styles.typingBubble]}>
                <View style={styles.typingDots}>
                  <View style={[styles.typingDot, styles.dot1, { backgroundColor: colors.textTertiary }]} />
                  <View style={[styles.typingDot, styles.dot2, { backgroundColor: colors.textTertiary }]} />
                  <View style={[styles.typingDot, styles.dot3, { backgroundColor: colors.textTertiary }]} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={[styles.inputWrapper, { backgroundColor: colors.surface }]}>
            <TextInput
              style={[styles.textInput, { color: colors.text }]}
              placeholder="Ask about skincare..."
              placeholderTextColor={colors.textTertiary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            
            <View style={styles.inputActions}>
              <TouchableOpacity style={styles.micButton}>
                <Mic size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.sendButton, 
                  { backgroundColor: inputText.trim() ? colors.primary : colors.border }
                ]}
                onPress={() => sendMessage(inputText)}
                disabled={!inputText.trim()}
              >
                <Send size={16} color={inputText.trim() ? 'white' : colors.textTertiary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 20,
  },
  coachName: {
    fontSize: 16,
    fontWeight: '600',
  },
  coachStatus: {
    fontSize: 12,
    marginTop: 2,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 12,
  },
  personalitySelector: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  personalitySelectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  personalityOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  personalityOption: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    opacity: 0.7,
  },
  selectedPersonality: {
    opacity: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  personalityEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  personalityName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  personalityDescription: {
    fontSize: 10,
    textAlign: 'center',
  },
  suggestionsContainer: {
    paddingVertical: 16,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  suggestionsList: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  suggestionChip: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  suggestionText: {
    fontSize: 14,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  botAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  typingBubble: {
    paddingVertical: 16,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  typingDots: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
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
  messageSuggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
    marginLeft: 36,
  },
  messageSuggestionChip: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
  },
  messageSuggestionText: {
    fontSize: 12,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    maxHeight: 100,
    textAlignVertical: 'center',
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 8,
  },
  micButton: {
    padding: 8,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});