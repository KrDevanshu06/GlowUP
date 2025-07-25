import React, { createContext, useContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

interface OfflineContextType {
  isOnline: boolean;
  isConnected: boolean;
  syncData: () => Promise<void>;
  queueAction: (action: any) => void;
  pendingActions: any[];
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [pendingActions, setPendingActions] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
      setIsConnected(state.isInternetReachable ?? false);
      
      // Auto-sync when coming back online
      if (state.isConnected && state.isInternetReachable) {
        syncData();
      }
    });

    // Load pending actions from storage
    const storedActions = storage.getString('pendingActions');
    if (storedActions) {
      setPendingActions(JSON.parse(storedActions));
    }

    return unsubscribe;
  }, []);

  const queueAction = (action: any) => {
    const newActions = [...pendingActions, { ...action, timestamp: Date.now() }];
    setPendingActions(newActions);
    storage.set('pendingActions', JSON.stringify(newActions));
  };

  const syncData = async () => {
    if (!isOnline || !isConnected || pendingActions.length === 0) return;

    try {
      // Process pending actions
      for (const action of pendingActions) {
        // Implement your sync logic here based on action type
        console.log('Syncing action:', action);
      }
      
      // Clear pending actions after successful sync
      setPendingActions([]);
      storage.delete('pendingActions');
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  return (
    <OfflineContext.Provider
      value={{
        isOnline,
        isConnected,
        syncData,
        queueAction,
        pendingActions,
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  if (context === undefined) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
}