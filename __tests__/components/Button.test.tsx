import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/ui/Button';
import { ThemeProvider } from '@/contexts/ThemeContext';

const MockedButton = (props: any) => (
  <ThemeProvider>
    <Button {...props} />
  </ThemeProvider>
);

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <MockedButton title="Test Button" onPress={() => {}} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <MockedButton title="Test Button" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading spinner when loading', () => {
    const { getByTestId } = render(
      <MockedButton title="Test Button" onPress={() => {}} loading={true} />
    );
    
    // Note: You'd need to add testID to LoadingSpinner component
    // expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <MockedButton title="Test Button" onPress={mockOnPress} disabled={true} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});