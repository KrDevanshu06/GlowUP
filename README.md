# GlowUp - AI Skincare Companion

A production-ready mobile application built with Expo and React Native that helps users identify their skin type, get personalized product recommendations, and track their skincare journey.

## 🌟 Features

### Core Functionality
- **Authentication System**: Complete login/signup flow with Supabase Auth
- **Camera Integration**: Skin analysis, progress tracking, and QR code scanning
- **Offline Support**: Works offline with data synchronization
- **Dark/Light Mode**: System-aware theming with smooth transitions
- **Haptic Feedback**: Enhanced user experience with tactile feedback

### Screens & Navigation
- **Onboarding**: Welcome flow with social sign-up options
- **Skin Analysis**: AI-powered quiz and camera-based analysis
- **Product Recommendations**: Personalized suggestions with match percentages
- **Routine Builder**: Drag-and-drop routine creation with export options
- **Progress Tracking**: Calendar view with before/after photos
- **Glow Coach**: AI chatbot with customizable personalities
- **Profile**: User settings, achievements, and statistics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd glowup-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Environment Setup

Create a `.env` file with the following variables:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_APP_NAME=GlowUp
EXPO_PUBLIC_APP_VERSION=1.0.0
```

## 📱 Platform Support

### iOS
- iOS 13.0+
- iPhone and iPad support
- Native camera integration
- Haptic feedback

### Android
- Android 6.0+ (API level 23)
- Camera and storage permissions
- Material Design components

### Web (PWA)
- Progressive Web App capabilities
- Responsive design
- Offline functionality
- Camera access (where supported)

## 🏗️ Architecture

### Project Structure
```
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   ├── auth.tsx           # Authentication screen
│   ├── camera.tsx         # Camera modal
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   ├── camera/           # Camera components
│   └── ui/               # UI components
├── contexts/             # React contexts
├── hooks/                # Custom hooks
├── lib/                  # Utilities and configurations
├── types/                # TypeScript type definitions
└── __tests__/            # Test files
```

### State Management
- **React Context**: For global state (auth, theme, offline)
- **React Hook Form**: For form state management
- **MMKV**: For fast local storage
- **Supabase**: For backend and real-time features

## 🎨 Design System

### Colors
- **Primary**: #8B5CF6 (Purple)
- **Secondary**: #10B981 (Green)
- **Accent**: #F59E0B (Orange)
- **Background**: Dynamic based on theme
- **Surface**: Elevated backgrounds

### Typography
- **Font Family**: Inter (system fallback)
- **Weights**: 400 (Regular), 600 (Semibold), 700 (Bold), 800 (Extrabold)

### Components
- **Button**: Multiple variants with haptic feedback
- **Toast**: Animated notifications
- **LoadingSpinner**: Smooth loading animations

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage
- Unit tests for components
- Integration tests for contexts
- Snapshot tests for UI consistency

## 📦 Building & Deployment

### Development Build
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

### Production Build
```bash
# Web (Static)
npm run build:web

# iOS (with EAS)
npm run build:ios

# Android (with EAS)
npm run build:android
```

### PWA Deployment
The web build is PWA-ready with:
- Service worker for offline functionality
- App manifest for installation
- Responsive design for all screen sizes

## 🔧 Development Workflow

### Code Quality
```bash
# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check
```

### Git Hooks
- Pre-commit: Lint and type check
- Pre-push: Run tests

## 🌐 Accessibility

### Features
- Screen reader support
- High contrast mode
- Keyboard navigation (web)
- Semantic HTML elements
- WCAG 2.1 AA compliance

### Testing
- Use screen readers during development
- Test with high contrast mode
- Verify keyboard navigation

## 📊 Performance

### Optimizations
- Image optimization with expo-image
- Bundle splitting for web
- Lazy loading of screens
- Efficient re-renders with React.memo

### Monitoring
- Performance metrics tracking
- Error boundary implementation
- Crash reporting setup

## 🔐 Security

### Authentication
- Secure token storage with expo-secure-store
- Session management with Supabase
- Password validation and hashing

### Data Protection
- HTTPS enforcement
- Input validation and sanitization
- Secure API communication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Follow the established code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review existing issues and discussions

## 🚀 Roadmap

### Upcoming Features
- [ ] AI-powered ingredient analysis
- [ ] Social sharing capabilities
- [ ] Advanced progress analytics
- [ ] Integration with wearable devices
- [ ] Multi-language support

### Performance Improvements
- [ ] Image caching optimization
- [ ] Background sync improvements
- [ ] Enhanced offline capabilities