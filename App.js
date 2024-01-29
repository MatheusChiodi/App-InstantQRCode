import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

import Routes from './src/routes';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          <View style={styles.container2}>
            <Image
              source={require('./assets/splash.png')}
              style={{ width: 350, height: 350 }}
            />
          </View>
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Routes />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container2: {
    flex: 1,
    backgroundColor: '#F8F8F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
