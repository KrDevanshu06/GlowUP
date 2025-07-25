import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Toast, ToastType } from '@/components/ui/Toast';
import { SignupCredentials } from '@/types/auth';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

interface SignupScreenProps {
  onNavigateToLogin: () => void;
}

export function SignupScreen({ onNavigateToLogin }: SignupScreenProps) {
  const { signUp, loading } = useAuth();
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: ToastType }>({
    visible: false,
    message: '',
    type: 'info',
  });

  const { control, handleSubmit, formState: { errors } } = useForm<SignupCredentials>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignupCredentials) => {
    try {
      await signUp(data);
      showToast('Account created! Check your email to verify 📧', 'success');
    } catch (err: any) {
      showToast(err.message || 'Signup failed', 'error');
    }
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ visible: true, message, type });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LinearGradient
          colors={['#E8D5FF', '#B8F2D6', '#FFD4C4']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Join GlowUp! ✨</Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                  Start your personalized skincare journey
                </Text>
              </View>

              {/* Form */}
              <View style={[styles.form, { backgroundColor: colors.surface }]}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.inputContainer}>
                      <View style={[styles.inputWrapper, { backgroundColor: colors.background, borderColor: errors.name ? colors.error : colors.border }]}>
                        <User size={20} color={colors.textSecondary} />
                        <TextInput
                          style={[styles.input, { color: colors.text }]}
                          placeholder="Full name"
                          placeholderTextColor={colors.textTertiary}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          autoComplete="name"
                        />
                      </View>
                      {errors.name && (
                        <Text style={[styles.errorText, { color: colors.error }]}>
                          {errors.name.message}
                        </Text>
                      )}
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.inputContainer}>
                      <View style={[styles.inputWrapper, { backgroundColor: colors.background, borderColor: errors.email ? colors.error : colors.border }]}>
                        <Mail size={20} color={colors.textSecondary} />
                        <TextInput
                          style={[styles.input, { color: colors.text }]}
                          placeholder="Email address"
                          placeholderTextColor={colors.textTertiary}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoComplete="email"
                        />
                      </View>
                      {errors.email && (
                        <Text style={[styles.errorText, { color: colors.error }]}>
                          {errors.email.message}
                        </Text>
                      )}
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.inputContainer}>
                      <View style={[styles.inputWrapper, { backgroundColor: colors.background, borderColor: errors.password ? colors.error : colors.border }]}>
                        <Lock size={20} color={colors.textSecondary} />
                        <TextInput
                          style={[styles.input, { color: colors.text }]}
                          placeholder="Password"
                          placeholderTextColor={colors.textTertiary}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          secureTextEntry={!showPassword}
                          autoComplete="new-password"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <EyeOff size={20} color={colors.textSecondary} />
                          ) : (
                            <Eye size={20} color={colors.textSecondary} />
                          )}
                        </TouchableOpacity>
                      </View>
                      {errors.password && (
                        <Text style={[styles.errorText, { color: colors.error }]}>
                          {errors.password.message}
                        </Text>
                      )}
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.inputContainer}>
                      <View style={[styles.inputWrapper, { backgroundColor: colors.background, borderColor: errors.confirmPassword ? colors.error : colors.border }]}>
                        <Lock size={20} color={colors.textSecondary} />
                        <TextInput
                          style={[styles.input, { color: colors.text }]}
                          placeholder="Confirm password"
                          placeholderTextColor={colors.textTertiary}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          secureTextEntry={!showConfirmPassword}
                          autoComplete="new-password"
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? (
                            <EyeOff size={20} color={colors.textSecondary} />
                          ) : (
                            <Eye size={20} color={colors.textSecondary} />
                          )}
                        </TouchableOpacity>
                      </View>
                      {errors.confirmPassword && (
                        <Text style={[styles.errorText, { color: colors.error }]}>
                          {errors.confirmPassword.message}
                        </Text>
                      )}
                    </View>
                  )}
                />

                <Button
                  title="Create Account"
                  onPress={handleSubmit(onSubmit)}
                  loading={loading}
                  style={styles.signupButton}
                />

                <View style={styles.loginPrompt}>
                  <Text style={[styles.loginText, { color: colors.textSecondary }]}>
                    Already have an account?{' '}
                  </Text>
                  <TouchableOpacity onPress={onNavigateToLogin}>
                    <Text style={[styles.loginLink, { color: colors.primary }]}>
                      Sign in
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>

        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          onHide={hideToast}
        />
      </KeyboardAvoidingView>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  signupButton: {
    marginTop: 8,
    marginBottom: 20,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});