import React, { useState } from 'react';
import { LoginScreen } from '@/components/auth/LoginScreen';
import { SignupScreen } from '@/components/auth/SignupScreen';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  if (isLogin) {
    return (
      <LoginScreen
        onNavigateToSignup={() => setIsLogin(false)}
        onNavigateToForgotPassword={() => {
          // Handle forgot password navigation
          console.log('Navigate to forgot password');
        }}
      />
    );
  }

  return (
    <SignupScreen
      onNavigateToLogin={() => setIsLogin(true)}
    />
  );
}