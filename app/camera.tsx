import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { CameraScreen } from '@/components/camera/CameraScreen';

export default function CameraModal() {
  const { mode } = useLocalSearchParams<{ mode: 'analysis' | 'progress' | 'qr' }>();

  const handleClose = () => {
    router.back();
  };

  const handleCapture = (uri: string) => {
    // Handle captured image
    console.log('Captured image:', uri);
    router.back();
  };

  const handleQRScan = (data: string) => {
    // Handle QR scan result
    console.log('QR scanned:', data);
    router.back();
  };

  return (
    <CameraScreen
      mode={mode || 'analysis'}
      onClose={handleClose}
      onCapture={handleCapture}
      onQRScan={handleQRScan}
    />
  );
}