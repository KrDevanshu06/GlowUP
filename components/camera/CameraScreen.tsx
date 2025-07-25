import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { Camera, RotateCcw, Slash as Flash, FlashlightOff as FlashOff, X, Image as ImageIcon, QrCode } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';

interface CameraScreenProps {
  mode: 'analysis' | 'progress' | 'qr';
  onClose: () => void;
  onCapture: (uri: string) => void;
  onQRScan?: (data: string) => void;
}

export function CameraScreen({ mode, onClose, onCapture, onQRScan }: CameraScreenProps) {
  const { colors } = useTheme();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.permissionText, { color: colors.text }]}>
          Requesting camera permission...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.permissionContainer}>
          <Camera size={60} color={colors.textSecondary} />
          <Text style={[styles.permissionTitle, { color: colors.text }]}>
            Camera Access Required
          </Text>
          <Text style={[styles.permissionMessage, { color: colors.textSecondary }]}>
            We need camera access to {mode === 'qr' ? 'scan QR codes' : 'analyze your skin'}
          </Text>
          <Button
            title="Grant Permission"
            onPress={requestPermission}
            style={styles.permissionButton}
          />
          <Button
            title="Cancel"
            onPress={onClose}
            variant="ghost"
          />
        </View>
      </SafeAreaView>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        if (photo?.uri) {
          onCapture(photo.uri);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      onCapture(result.assets[0].uri);
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const toggleFlash = () => {
    setFlash(!flash);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (mode === 'qr' && onQRScan) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onQRScan(data);
    }
  };

  const getInstructions = () => {
    switch (mode) {
      case 'analysis':
        return 'Position your face in the circle for skin analysis';
      case 'progress':
        return 'Take a progress photo to track your glow journey';
      case 'qr':
        return 'Point camera at QR code to scan';
      default:
        return 'Position your subject in the frame';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        flash={flash ? 'on' : 'off'}
        onBarcodeScanned={mode === 'qr' ? handleBarCodeScanned : undefined}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {mode === 'qr' ? 'Scan QR Code' : mode === 'analysis' ? 'Skin Analysis' : 'Progress Photo'}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructions}>{getInstructions()}</Text>
        </View>

        {/* Camera Overlay */}
        {mode === 'analysis' && (
          <View style={styles.overlay}>
            <View style={styles.faceGuide} />
          </View>
        )}

        {mode === 'qr' && (
          <View style={styles.overlay}>
            <View style={styles.qrGuide} />
          </View>
        )}

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={pickImage} style={styles.controlButton}>
            <ImageIcon size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>

          <View style={styles.rightControls}>
            <TouchableOpacity onPress={toggleFlash} style={styles.controlButton}>
              {flash ? (
                <Flash size={24} color="#fff" />
              ) : (
                <FlashOff size={24} color="#fff" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={toggleCameraFacing} style={styles.controlButton}>
              <RotateCcw size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  permissionButton: {
    marginBottom: 12,
    minWidth: 200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  closeButton: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  headerSpacer: {
    width: 40,
  },
  instructionsContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceGuide: {
    width: 250,
    height: 300,
    borderRadius: 125,
    borderWidth: 3,
    borderColor: '#fff',
    borderStyle: 'dashed',
  },
  qrGuide: {
    width: 200,
    height: 200,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 12,
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  controlButton: {
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8D5FF',
  },
  rightControls: {
    gap: 12,
  },
});