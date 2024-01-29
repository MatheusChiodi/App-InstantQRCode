import React, { useRef, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContext } from './NavigationContext';
import TabRoutes from './tab.routes';

export default function Routes() {
  const navigationRef = useRef();

  const navigationValue = useMemo(
    () => ({
      navigate: (name, params) => navigationRef.current?.navigate(name, params),
    }),
    []
  );

  return (
    <SafeAreaProvider>
      <NavigationContext.Provider value={navigationValue}>
        <NavigationContainer ref={navigationRef}>
          <TabRoutes />
        </NavigationContainer>
      </NavigationContext.Provider>
    </SafeAreaProvider>
  );
}
