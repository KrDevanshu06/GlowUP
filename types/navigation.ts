import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<TabParamList>;
  Onboarding: undefined;
  Camera: {
    mode: 'analysis' | 'progress' | 'qr';
  };
  ProductDetails: {
    productId: string;
  };
  RoutineDetails: {
    routineId: string;
  };
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Welcome: undefined;
};

export type TabParamList = {
  Home: undefined;
  Analysis: undefined;
  Routine: undefined;
  Chat: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}